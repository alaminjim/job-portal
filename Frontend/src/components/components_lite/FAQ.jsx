import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "How do I apply for a job?",
    answer: "To apply for a job, first create an account as an 'Applicant'. Once logged in, browse through the listings, click on 'Details' for a job you're interested in, and hit the 'Apply' button."
  },
  {
    question: "Is there a fee for using JobPortal?",
    answer: "No, JobPortal is completely free for job seekers. You can search, save, and apply for as many jobs as you like without any cost."
  },
  {
    question: "How can I track my applications?",
    answer: "You can track your applications by clicking on your profile avatar in the Navbar and selecting 'My Applications'. There, you'll see a list of all jobs you've applied for and their current status."
  },
  {
    question: "Can I edit my profile after registration?",
    answer: "Yes! You can update your profile, including your bio, skills, and resume, at any time through the 'Profile' page. Simply click on the 'Edit Profile' button to make changes."
  },
  {
    question: "How do recruiters contact me?",
    answer: "When a recruiter is interested in your application, they can view your profile and contact details. They will typically reach out to you via email or the phone number provided in your profile."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-purple-100 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-purple-600' : 'text-gray-800 group-hover:text-purple-500'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-purple-600 text-white rotate-180' : 'bg-purple-50 text-purple-600'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            Got questions? We've got answers to help you navigate your career journey.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-purple-50/30 rounded-[2.5rem] p-8 md:p-12 border border-purple-100"
        >
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
