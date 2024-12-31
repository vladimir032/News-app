import { useState, useEffect } from "react";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import styles from "./styles.module.css"
import { getNews } from "../../api/apiNews";
import NewsList from "../../components/NewsList/NewsList";
import Skeleton from "../../components/Skeleton/Skeleton";

const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async() => {
            try {
                setLoading(true)
                const response = await getNews();
                if (response.news && response.news.length > 0) {
                    setNews(response.news);
                    setLoading(false);
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
                {news.length > 0 && !isLoading ? (
                <NewsBanner item={news[0]} />
                ) : (
                
                <Skeleton type='banner' count={1}/>
            )}
            {!isLoading ? (
            <NewsList news={news}/>
            ) : (<Skeleton type='item' count={10}/>
            )}
        </main>
    )
};
export default Main;