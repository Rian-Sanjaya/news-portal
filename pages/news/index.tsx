// import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { truncateString } from "../../src/helpers/stringFunctions";
import styles from "../../src/styles/News.module.scss";

type Data = {
  id: string;
  date: Date;
  headlineText: string;
  category: string;
  image: string;
};

// type Props = {
//   data: Array<Data>;
// };

// if using SSR
// const NewsPage = ({ data }: Props) => {
const NewsPage = () => {
  const [newsData, setNewsData] = useState<Array<Data>>();
  const [loading, setLoading] = useState(false);

  // using CSR for fetching data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/news`)
      .then((res) => res.json())
      .then((data) => {
        setNewsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }, []);

  // using SSR for fetching data
  // useEffect(() => {
  //   console.log('data dalem: ', data);
  //   setNewsData(data);
  // }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.main_content}>
        {newsData &&
          newsData.length > 0 &&
          newsData.map((news) => (
            <div key={news.id} className={styles.card}>
              <div className={styles.headline_news}>
                <div>
                  <div className={`text_label`} style={{ marginBottom: "8px" }}>
                    {moment(news.date).format("DD MMMM YYYY, hh:mm")}
                  </div>
                  <div className={`text_content`}>
                    {truncateString(news.headlineText, 65)}
                  </div>
                </div>
                <div className={styles.image_box}>
                  <Image
                    className={styles.image_main}
                    src={news.image}
                    alt="Headline Picture"
                    width={112}
                    height={84}
                  />
                  <div className={styles.logo_box}>
                    <img
                      className={styles.logo_main}
                      src={`/images/logo_idntimes.png`}
                      alt="IDN Times Logo"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.footer_box}>
                <div className={styles.footer}>
                  <div className={`text_label ${styles.text_label}`}>
                    {news.category}
                  </div>
                  <div className={`text_label`} style={{ fontSize: "16px", color: "#14171A", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faShareNodes} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const res = await fetch(`http://localhost:3000/api/news`);
//   const data = await res.json();
//   return { props: { data } };
// }

export default NewsPage;
