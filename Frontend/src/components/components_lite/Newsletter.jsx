import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Simulate API call
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-purple-200"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="relative z-10 text-center text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Don't miss your next <br /> big opportunity
            </motion.h2>
            <p className="text-purple-100 text-lg mb-10 max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest job openings, career advice, and industry trends delivered to your inbox.
            </p>

            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all text-lg"
              />
              <button 
                type="submit"
                className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-2 group"
              >
                Subscribe
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
            <p className="mt-6 text-white/50 text-sm">
                We care about your data. Read our Privacy Policy. No spam, ever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
