import cardStyle from './card.module.css'

interface CardProps {
    headerTitle: string;
    children: React.ReactNode;
}

export function Card(props: CardProps) {
    return (
        <div className={cardStyle.card}>
            <header className={cardStyle.cardHeader}>
                <h1 className={cardStyle.cardHeaderTitle}>{props.headerTitle}</h1>
            </header>
            <section className={cardStyle.cardBody}>
                {props.children}
            </section>
        </div>
    )
}