'use client'

// src/pages/privacy-policy.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const PrivacyPolicy = () => {
    const contentRef = useRef(null);

    // GSAP Scroll Animation
    useEffect(() => {
        const content = contentRef.current;
        if (content) {
            gsap.fromTo(
                content,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: content }
            );
        }
    }, []);

    return (
        <div className="container mx-auto p-6">
            {/* Framer Motion Fade-in Animation */}
            <motion.h1
                className="text-4xl font-bold text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                Privacy Policy
            </motion.h1>

            {/* Content Section with GSAP Scroll Animation */}
            <motion.div ref={contentRef} className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                    <p>
                        Welcome to our Privacy Policy page. This policy explains how we collect, use, and share your
                        personal information when you use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
                    <p>
                        We collect various types of information, including your name, email address, and other contact
                        details, when you use our services or interact with our website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
                    <p>
                        Your information is used to provide you with the best experience when using our services. We
                        may use it to contact you, provide customer support, and improve our offerings.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
                    <p>
                        We take data security seriously and implement a variety of security measures to protect your
                        personal information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">5. Changes to This Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. If we make changes, we will notify you by
                        revising the date at the top of the policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy, please contact us.
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
