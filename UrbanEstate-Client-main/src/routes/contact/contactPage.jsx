import "./contactPage.scss";

function ContactPage() {
    return (
        <section className="contact-section">
            <div className="container">
                <div className="contact-info">
                    <h2>Contact Us</h2>
                    <p>
                        We'd love to hear from you! Whether you have questions about our services, need assistance, or
                        just want to say hello, our team is here to help. Get in touch with us using the form below or
                        via the provided contact details.
                    </p>
                    <ul className="info-list">
                        <li>
                            <strong>Address:</strong> 123 Urban Estate, Vishal Enclave, Tagore Garden Extension ,Delhi
                            110027
                        </li>
                        <li>
                            <strong>Email:</strong> <a href="mailto:info@urbanestate.com">info@urbanestate.com</a>
                        </li>
                        <li>
                            <strong>Phone:</strong> <a href="tel:+1234567890">+1 234-567-890</a>
                        </li>
                        <li>
                            <strong>Hours:</strong> Mon - Fri: 9:00 AM - 6:00 PM
                        </li>
                    </ul>
                </div>
                <div className="contact-form">
                    <h3>Send Us a Message</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Write your message"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <div className="contact-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45370.20553316323!2d77.09321827527711!3d28.647532025700887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e1!3m2!1sen!2sin!4v1732452330141!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    );
}

export default ContactPage;
