"use client"
import pageStyles from './page.module.css'
import { Footer } from './_components/Footer'
import { Card } from './_components/Card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function Page() {
    const router = useRouter()
    return (
        <main className={pageStyles.screen} style={{ flex: 1 }}>
            <section className={pageStyles.container}>
                <Card
                    headerTitle="Teste suas habilidades"
                >
                    <p style={{ marginBottom: "32px" }}>Teste os seus conhecimentos sobre o universo Marvel e divirta-se criando o seu AluraQuiz!</p>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const name = "Mario"
                            router.push(`/game?player=${name}`)
                        }}>
                        <div style={{ marginBottom: "20px" }}>
                            <input style={{ backgroundColor:'transparent', padding:12, paddingLeft:10, width:'100%', borderWidth:1,  }}  type='text' name="playerName" placeholder='Diz ai seu nome pra jogar :)' />
                        </div>
                        <button>
                            Jogar
                        </button>
                    </form>
                </Card>
                <Footer />
            </section>
        </main>
    )
}