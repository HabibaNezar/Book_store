import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[--second-color] text-[--background-color] mt-10 shadow-inner">
      <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* About */}
        <div>
          <h2 className="font-bold mb-3 text-lg">About</h2>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Our Mission</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>Press & Media</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="font-bold mb-3 text-lg">Customer Service</h2>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Payment Options</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h2 className="font-bold mb-3 text-lg">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li>Genre</li>
            <li>New Releases</li>
            <li>Best Sellers</li>
            <li>Authors</li>
            <li>Deals & Offers</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="font-bold mb-3 text-lg">Stay Connected</h2>
          <ul className="space-y-2 text-sm">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Youtube</li>
          </ul>
        </div>

      </div>

      {/* حقوق النشر */}
      <div className="border-t border-[--accent-color-light] text-center text-sm py-4 px-4">
        <p>Copyright © 2025 Habiba | Terms & Conditions | Privacy Policy</p>
      </div>
    </footer>
  )
}
