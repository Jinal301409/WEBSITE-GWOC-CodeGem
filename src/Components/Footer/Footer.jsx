import React from "react";
import { footerStyles as styles } from "../../assets/dummyStyles";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkedAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { GiCarKey } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.topElements}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.roadLine} />
      </div>

      <div className={styles.innerContainer}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}>
              <span className="font-cinzel text-3xl md:text-4xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-400">
                Chill Thrive
              </span>
              <span className="font-dancingscript text-sm text-blue-200 mt-1">
                Cold • Heat • Recovery
              </span>
            </div>


            <p className=' font-cinzel tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-400 '>
              “Experience ultimate recovery and wellness with our ice baths, steam therapy, and jacuzzi sessions. Elevate your mind and body every day.”
            </p>

            <div className={styles.socialIcons}>
              {[FaFacebookF,
                FaTwitter,
                FaInstagram,
                FaLinkedinIn,
                FaYoutube
              ].map((Icon, i) => (
                <a href="#" key={i} className={styles.socialIcon}>
                  <Icon />
                </a>
              ))}

            </div>
          </div>
          {/* QUCIK LINKS */}
          <div>
            <h3 className={styles.sectionTitle}>
              Quick Links
              <span className={styles.underline} />
            </h3>
            <ul className={styles.linkList}>
              {["Home", "Services", "About", "Awareness Page", "Photo Gallary/Events", "Contact Us"].map((link, i) => (
                <li key={i}>
                  <a
                    href={
                      link === "Home"
                        ? "/"
                        : link === "Contact Us"
                          ? "/contact"
                          : "/cars"
                    }
                    className={styles.linkItem}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* CONTACT */}
          <div>
            <h3 className={styles.sectionTitle}>
              Contact Us
              <span className={styles.underline} />
            </h3>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <FaMapMarkedAlt
                  size={18}
                  className={styles.contactIcon}
                  style={{ minWidth: "18px" }}
                />
                <span>Plot No - 3, Beside Avalon Buss Hub, Near Indian Bank, SD Jain School Lane, Piplod, Surat - 395007 (Vesu), located at Samavesh Aqua Therapy Centre, near Indian Bank and opposite Livestream Cafe.</span>
              </li>

              <li className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <span>092270 25160</span>
              </li>
              <li className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <span>chillthriveokitr@gmail.com</span>
              </li>

            </ul>
            <div className={styles.hoursContainer}>
              <h4 className={styles.hoursTitle}>Business Hours</h4>
              <div className={styles.hoursText}>
                <p>Monday - Friday: 7:00 AM - 9:00 PM</p>
                <p>Saturday: 7:00 AM - 9:00 PM</p>
                <p>Sunday: 7:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>
          {/* NEWSLETTER */}
          <div>
            <h3 className={styles.sectionTitle}>
              Newsletter
              <span className={styles.underline}></span>
            </h3>
            <p className={styles.newsletterText}>
              Subscribe for special offers and updates
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your Email Address"
                className={styles.input}
              />

              <button type="submit" className={styles.subscribeButton}>
                <GiCarKey className="mr-2 text-lg sm:text-xl" />
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
        {/* BOTTOM COPYRIGHT */}
        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} Chill Thrive. All rights reserved.
          </p>
          <p className="mt-3 md:mt-0">
            Designed by{" "}
            <a
              href="https://codegem.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.designerLink}
            >
              CodeGem
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

