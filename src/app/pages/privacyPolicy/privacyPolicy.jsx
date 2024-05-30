import React from 'react';
import CookiePolicy from '../../components/privacity/cookies';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen pt-[60px]">
            <Navbar />
            <div className="flex-grow pt-[60px]">
                <h1 className="text-center text-3xl text-white p-8" style={{ backgroundColor: "#3854A6" }}>Política de Privacidad</h1>
                <CookiePolicy />
            </div>
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
