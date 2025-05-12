const OfficeLocation = () => {
  return (
   <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">📍 Visit Our Office</h2>
          <p className="text-gray-500 text-lg">
            We are located in the Heart Foundation of Mirpur, Dhaka. Come visit us at <br />
            <span className="text-blue-600 font-semibold">97/2 West Monipur, Mirpur, Dhaka-1216</span>
          </p>
        </div>

        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
          <iframe
            title="EstateHive Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.684070213426!2d90.35386547537358!3d23.757264278682437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c12177a8d2e3%3A0xb174db01dbe57955!2s97%2F2%20West%20Monipur%20Rd%2C%20Dhaka%201216!5e0!3m2!1sen!2sbd!4v1715535587581!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default OfficeLocation
