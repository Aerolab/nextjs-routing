import Head from 'next/head'
import Link from 'next/link'

export default ({ children, title = "TE OLVIDASTE EL TITLE IMBECIL" }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta name="viewport" content="width=device-width" />
    </Head>

    <nav>
      <Link href="/" prefetch><a>Dribbble 💖</a></Link>
    </nav>

    { children } 

    <style jsx>{`
      :global(body) {
        background: #f7f7f7;
        margin: 0;
        font-family: system-ui;
      }
      nav {
        background: #333;
        color: #fff;
        font-weight: 200;
        text-align: center;
      }
      nav a {
        display: inline-block;
        padding: 1em;
        color: #fff;
        text-decoration: none;
      }
    `}</style>
  </div>
)