import styles from "./styles.module.css"

const NewsList = ({news}) => {
    return (
        <ul className={styles.list}>
            {news.map(item => {
                return <li key={item.id}>{item.title}</li>
            })}
        </ul>
    );
};
export default NewsList;