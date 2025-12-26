const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

/**
 * Save Friend Bet data
 * POST /api/bets/friend
 * @requires Authentication
 */
router.post('/friend', auth, async (req, res) => {
  try {
    const { 
      eventId, 
      betType, 
      prediction, 
      friendId, 
      wagerAmount, 
      customTerms, 
      riderOneId, 
      riderTwoId, 
      selectedRiderId 
    } = req.body;

    // Get current user ID from authenticated request
    const userId = req.user.id;

    // Insert the bet into database
    const result = await db.query(
      `INSERT INTO friend_bets (
        creator_id, target_id, event_id, bet_type, 
        prediction, wager_amount, custom_terms, 
        rider_one_id, rider_two_id, selected_rider_id, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        userId, friendId, eventId, betType, 
        prediction, wagerAmount, customTerms || null, 
        riderOneId || null, riderTwoId || null, 
        selectedRiderId || null, 'pending'
      ]
    );

    // Create a transaction record
    await db.query(
      `INSERT INTO transactions (
        user_id, amount, type, description, status, related_id
      ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId, 
        wagerAmount, 
        'bet_placed', 
        `Friend bet placed for ${eventId}`, 
        'pending',
        result.rows[0].id
      ]
    );

    // Return the created bet
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error saving friend bet:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving friend bet'
    });
  }
});

/**
 * Get Friend Bets for Current User
 * GET /api/bets/friend
 * @requires Authentication
 */
router.get('/friend', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get bets where user is creator or target
    const result = await db.query(
      `SELECT fb.*, 
       c.username as creator_username,
       t.username as target_username,
       e.title as event_title,
       e.date as event_date
       FROM friend_bets fb
       JOIN users c ON fb.creator_id = c.id
       JOIN users t ON fb.target_id = t.id
       JOIN races e ON fb.event_id = e.id
       WHERE fb.creator_id = $1 OR fb.target_id = $1
       ORDER BY fb.created_at DESC`,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching friend bets:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching friend bets'
    });
  }
});

/**
 * Save Group Bet data
 * POST /api/bets/group
 * @requires Authentication
 */
router.post('/group', auth, async (req, res) => {
  try {
    const { 
      groupId, 
      eventId, 
      title,
      description,
      options,
      deadlineDate
    } = req.body;

    // Get current user ID from authenticated request
    const userId = req.user.id;

    // Start a database transaction
    await db.query('BEGIN');

    // Insert the group bet
    const betResult = await db.query(
      `INSERT INTO group_bets (
        creator_id, group_id, event_id, title, 
        description, deadline_date, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        userId, groupId, eventId, title, 
        description, deadlineDate, 'open'
      ]
    );

    const betId = betResult.rows[0].id;

    // Insert all bet options
    for (const option of options) {
      await db.query(
        `INSERT INTO group_bet_options (
          bet_id, title, description
        ) VALUES ($1, $2, $3)`,
        [betId, option.title, option.description || null]
      );
    }

    // Commit the transaction
    await db.query('COMMIT');

    // Return the created bet
    res.status(201).json({
      success: true,
      data: betResult.rows[0]
    });
  } catch (error) {
    // Rollback in case of error
    await db.query('ROLLBACK');
    console.error('Error saving group bet:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving group bet'
    });
  }
});

/**
 * Get Group Bets for a specific group
 * GET /api/bets/group/:groupId
 * @requires Authentication
 */
router.get('/group/:groupId', auth, async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.user.id;

    // First check if user is member of the group
    const memberCheck = await db.query(
      `SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2`,
      [groupId, userId]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'You are not a member of this group'
      });
    }

    // Get all group bets
    const result = await db.query(
      `SELECT gb.*, 
       u.username as creator_username,
       g.name as group_name,
       e.title as event_title,
       e.date as event_date,
       (SELECT COUNT(*) FROM group_bet_participations WHERE bet_id = gb.id) as participation_count
       FROM group_bets gb
       JOIN users u ON gb.creator_id = u.id
       JOIN groups g ON gb.group_id = g.id
       JOIN races e ON gb.event_id = e.id
       WHERE gb.group_id = $1
       ORDER BY gb.created_at DESC`,
      [groupId]
    );

    // For each bet, get the options
    for (const bet of result.rows) {
      const optionsResult = await db.query(
        `SELECT * FROM group_bet_options WHERE bet_id = $1`,
        [bet.id]
      );
      bet.options = optionsResult.rows;
    }

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching group bets:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching group bets'
    });
  }
});

/**
 * Participate in a Group Bet
 * POST /api/bets/group/:betId/participate
 * @requires Authentication
 */
router.post('/group/:betId/participate', auth, async (req, res) => {
  try {
    const betId = req.params.betId;
    const { optionId, wagerAmount } = req.body;
    const userId = req.user.id;

    // Check if bet exists and is open
    const betCheck = await db.query(
      `SELECT * FROM group_bets WHERE id = $1 AND status = 'open'`,
      [betId]
    );

    if (betCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bet not found or is no longer open'
      });
    }

    // Check if user already participated
    const participationCheck = await db.query(
      `SELECT * FROM group_bet_participations WHERE bet_id = $1 AND user_id = $2`,
      [betId, userId]
    );

    if (participationCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You have already participated in this bet'
      });
    }

    // Start transaction
    await db.query('BEGIN');

    // Save participation
    const result = await db.query(
      `INSERT INTO group_bet_participations (
        bet_id, user_id, option_id, wager_amount
      ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [betId, userId, optionId, wagerAmount]
    );

    // Create transaction record
    await db.query(
      `INSERT INTO transactions (
        user_id, amount, type, description, status, related_id
      ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId, 
        wagerAmount, 
        'group_bet_joined', 
        `Joined group bet #${betId}`, 
        'pending',
        betId
      ]
    );

    // Commit transaction
    await db.query('COMMIT');

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    // Rollback in case of error
    await db.query('ROLLBACK');
    console.error('Error participating in group bet:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while participating in group bet'
    });
  }
});

/**
 * Get form data temporarily saved for current user
 * GET /api/bets/saved-forms
 * @requires Authentication
 */
router.get('/saved-forms', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await db.query(
      `SELECT * FROM saved_bet_forms WHERE user_id = $1`,
      [userId]
    );
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching saved forms:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching saved forms'
    });
  }
});

/**
 * Save bet form data temporarily
 * POST /api/bets/saved-forms
 * @requires Authentication
 */
router.post('/saved-forms', auth, async (req, res) => {
  try {
    const { formType, formData } = req.body;
    const userId = req.user.id;
    
    // Check if user already has a saved form of this type
    const existingForm = await db.query(
      `SELECT * FROM saved_bet_forms WHERE user_id = $1 AND form_type = $2`,
      [userId, formType]
    );
    
    if (existingForm.rows.length > 0) {
      // Update existing form
      const result = await db.query(
        `UPDATE saved_bet_forms 
         SET form_data = $1, updated_at = NOW() 
         WHERE user_id = $2 AND form_type = $3
         RETURNING *`,
        [formData, userId, formType]
      );
      
      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } else {
      // Insert new form
      const result = await db.query(
        `INSERT INTO saved_bet_forms (user_id, form_type, form_data) 
         VALUES ($1, $2, $3) RETURNING *`,
        [userId, formType, formData]
      );
      
      res.status(201).json({
        success: true,
        data: result.rows[0]
      });
    }
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving form data'
    });
  }
});

/**
 * Delete saved form data
 * DELETE /api/bets/saved-forms/:formType
 * @requires Authentication
 */
router.delete('/saved-forms/:formType', auth, async (req, res) => {
  try {
    const formType = req.params.formType;
    const userId = req.user.id;
    
    await db.query(
      `DELETE FROM saved_bet_forms WHERE user_id = $1 AND form_type = $2`,
      [userId, formType]
    );
    
    res.status(200).json({
      success: true,
      message: 'Form data deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting form data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting form data'
    });
  }
});

module.exports = router;