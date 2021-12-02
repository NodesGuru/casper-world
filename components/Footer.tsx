import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer>
        <div className='footer__copyright'>
          <span>2021 Made with</span>
          <img src={'/guru/futurama.svg'} alt='ben' />
          <span>for cryptocommunity</span>
        </div>

        <div className='footer__links'>
          <Link href='https://docs.google.com/forms/d/17YHIX347S0L_CCRGWRim7Ris2pXvjDJ7EyyDvU68BEs' passHref={true}>
            <a target='_blank' rel='nofollow noopener'>Submit testnet</a>
          </Link>
          <Link href='mailto:info@nodes.guru' passHref={true}>
            <a target='_blank' rel='nofollow noopener'>Contact us</a>
          </Link>
          <Link href='https://nodes.guru/donate' passHref={true}>
            <a>Donate</a>
          </Link>
        </div>
      </footer>

      <style jsx>{`
        footer {
          margin-top: 2vw;
          width: 100%;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          flex: 0 0 auto;
          font-size: 1.6rem;
          color: $grey-color;

          .footer__copyright {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .footer__links {
            a {
              text-decoration: none;
              color: $black-color;
              margin-left: 1rem;
              transition: .2s linear;
            }

            a:hover {
              color: $orange-color;
            }
          }
        }

        @media screen and (max-width: 767px) {
          footer {
            margin-top: 2rem;
            justify-content: space-around;
            flex-direction: column-reverse;
          }

          .footer__copyright {
            font-size: 16px;
            margin-top: 1rem;
          }

          .footer__links {
            margin-top: 1rem;
          }
        }

        @media screen and (max-width: 550px) {
          footer {
            flex-direction: column;
            padding-bottom: .5rem;
          }

          .footer__copyright {
            order: 2;
            font-size: 13px;
          }

          .footer__links {
            order: 1;
            display: flex;
            flex-direction: column;

            a {
              text-align: center;
            }
          }
        }
      `}</style>
    </>
  )
}
