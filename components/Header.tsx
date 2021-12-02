import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header>
        <Link href='https://nodes.guru/' passHref={true}>
          <a className='header__link'>
            <h1>Nodes</h1>
            <img src={'/guru/guru.svg'} alt='guru' />
            <span>Guru</span>
          </a>
        </Link>

        <nav className='header__nav'>
          <a href='https://t.me/nodesguru' target='_blank' rel='nofollow noopener'>
            <img src={'/guru/telegram.svg'} alt='telegram' />
          </a>
        </nav>
      </header>

      <style jsx>{`
        header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-top: 7px;
          margin-bottom: 3rem;

          .header__link {
            img {
              width: 100px;
              height: 90px;
            }

            h1 {
              color: $orange-color;
              font-weight: 400;
            }
          }

          > a {
            color: $brown-color;
          }

          a {
            text-decoration: none;
            display: flex;
            align-items: center;
            font-size: 3.2rem;

            h1 {
              font-size: 3.2rem;
            }
          }

          .header__link div {
            max-height: 105px;
          }
        }

        .header__nav {
          font-size: 1.6rem;
          display: flex;
          align-items: center;

          span {
            margin-right: 1.06rem;
          }

          img {
            width: 33px;
            height: 33px;
            cursor: pointer;
          }
        }

        @media screen and (max-width: 767px) {
          header {
            a {
              width: 100%;
            }

            span, h1 {
              display: none !important;
            }

            .header__link img {
              width: 100%;
            }
          }

          .header__nav {
            position: absolute;
            top: 1rem;
            right: .2rem;

            div span {
              display: block !important;
              font-size: 2vw;
            }

            img {
              width: 4vw;
            }
          }
        }

        @media screen and (max-width: 650px) {
          .header__nav {
            img {
              width: 6.5vw;
            }

            div span {
              display: block !important;
              font-size: 3vw;
            }
          }
        }
      `}</style>
    </>
  )
}
