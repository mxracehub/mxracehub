import { 
  FaPaypal, 
  FaBitcoin, 
  FaEthereum, 
  FaCcVisa,
  FaLock,
  FaShieldAlt,
  FaGlobe
} from "react-icons/fa";

const PaymentOptions = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary">Payment Options</h2>
          <p className="mt-2 text-gray-600">Multiple ways to fund your account and collect winnings</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center">
            <FaCcVisa className="text-4xl mb-3 text-gray-600" />
            <span className="text-sm font-medium">Credit Card</span>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center">
            <FaPaypal className="text-4xl mb-3 text-gray-600" />
            <span className="text-sm font-medium">PayPal</span>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center">
            <FaBitcoin className="text-4xl mb-3 text-gray-600" />
            <span className="text-sm font-medium">Bitcoin</span>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center">
            <FaEthereum className="text-4xl mb-3 text-gray-600" />
            <span className="text-sm font-medium">Ethereum</span>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="font-heading font-bold text-xl mb-2 text-secondary">Secure Transactions</h3>
              <p className="text-gray-600 mb-3">
                We use industry-standard encryption and security protocols to ensure your transactions are safe and secure. All cryptocurrency transactions are processed on the blockchain for maximum transparency.
              </p>
              <p className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
                <span className="flex items-center"><FaLock className="mr-1" /> SSL Encrypted</span>
                <span className="mx-1">|</span>
                <span className="flex items-center"><FaShieldAlt className="mr-1" /> Fraud Prevention</span>
                <span className="mx-1">|</span>
                <span className="flex items-center"><FaGlobe className="mr-1" /> Global Access</span>
              </p>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4" 
                alt="Secure Payments" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentOptions;
