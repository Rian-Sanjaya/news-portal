import { profile } from "console";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../../helpers/config";
import styles from "../../../styles/layout/header/HeaderProfile.module.scss";

interface ProfileDataInterface {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  jobType: string;
  following: string;
  followers: string;
}

const HeaderProfile = () => {
  const [profileData, setProfileData] = useState<ProfileDataInterface>({
    id: "",
    avatar: "",
    firstName: "",
    lastName: "",
    jobType: "",
    following: "",
    followers: "",
  });
  const [loading, setLoading] = useState(false);

  // have to use CSR data fetching
  // "because layout is not a page, we cannot use SSG (getStaticProps) or SSR (getServerSideProps) currently.""
  // source: https://nextjs.org/docs/basic-features/layouts
  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/api/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.share_box}>
          <div className={styles.chevron_left}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className={styles.share_nodes}>
            <FontAwesomeIcon icon={faShareNodes} />
          </div>
        </div>
        <div className={styles.profile}>
          {!loading && (
            <>
              <div className={styles.avatar_box}>
                <Image
                  className={styles.avatar}
                  src={profileData?.avatar}
                  alt="Profile avatar"
                  width={80}
                  height={80}
                />
              </div>
              <div className={styles.detail}>
                <div>
                  <div className={`text_label ${styles.text_label}`}>
                    {profileData.jobType}
                  </div>
                  <div
                    className={`text_content ${styles.text_content}`}
                  >{`${profileData.firstName} ${profileData.lastName}`}</div>
                </div>
                <div className={styles.follow}>
                  <div style={{ marginRight: "40px" }}>
                    <div className={`text_label ${styles.text_label}`}>
                      Following
                    </div>
                    <div className={`text_content ${styles.text_content}`}>
                      {profileData.following}
                    </div>
                  </div>
                  <div>
                    <div className="text_label">Folowwers</div>
                    <div className="text_content">{profileData.followers}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.description}>
          Yuk follow aku biar kita streaming game bareng setiap hari senin &
          jumat jam 10 AM - 3 PM. Jangan lupa follow IG aku juga ya @
          {profileData.firstName.slice(0, 3)}_
          {profileData.lastName.slice(0, 3).toLowerCase()}
        </div>
        <div className={styles.btn_follow_box}>
          <button className={styles.btn_follow}>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
