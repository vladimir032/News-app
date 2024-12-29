import { useState, useEffect } from "react";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import styles from "./styles.module.css"
import { getNews } from "../../api/apiNews";
import NewsList from "../../components/NewsList/NewsList";

const Main = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async() => {
            try {
                const response = await getNews();
                if (response.news && response.news.length > 0) {
                    setNews(response.news);
                } else {
                    setError('No news available');
                }
            } catch (error) {
                setError('Failed to fetch news');
                console.error(error);
            }
        };
        fetchNews();
    }, []);

    return (
        <main className={styles.main}>
            {error ? (
                <div className={styles.error}>{error}</div>
            ) : (
                news.length > 0 && <NewsBanner item={news[0]} />
            )}
            <NewsList news={news}/>
        </main>
    )
};
export default Main;