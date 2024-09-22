'use client'
// src/pages/terms-of-service.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const TermsOfService = () => {
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
                Terms of Service
            </motion.h1>

            {/* Content Section with GSAP Scroll Animation */}
            <motion.div ref={contentRef} className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By using our services, you agree to be bound by these Terms of Service. If you do not agree to
                        these terms, please discontinue using our services immediately.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">2. Changes to Terms</h2>
                    <p>
                        We reserve the right to update or modify these terms at any time. Any changes will be effective
                        immediately upon posting on this page. Please review these terms periodically.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">3. Use of Services</h2>
                    <p>
                        You agree to use our services only for lawful purposes and in a way that does not infringe the
                        rights of others. Misuse or abuse of our services will result in termination of access.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">4. Account Responsibilities</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account and password, and for
                        all activities that occur under your account. Please notify us immediately of any unauthorized
                        access.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
                    <p>
                        We are not liable for any damages or losses arising from the use of our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">6. Governing Law</h2>
                    <p>
                        These terms are governed by the laws of the jurisdiction in which we operate. Any disputes
                        arising from these terms will be resolved in the courts of that jurisdiction.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us at support@example.com.
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default TermsOfService;
