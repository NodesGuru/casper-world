import Link from 'next/link'

export default function WrongPage() {
  return (
    <>
      <section>
        <h1>OOPS!</h1>
        <h3>Something went wrong!</h3>
        <img src={'/guru/server.svg'} alt='server' />
        <div>We’re working hard to fix it.</div>
        <Link href={'/'}>
          <a>Back to main</a>
        </Link>
      </section>

      <style jsx>{`
        section {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;

          h1 {
            font-size: 4.8rem;
            font-weight: 600;
          }

          h3 {
            font-size: 3.2rem;
            font-weight: 400;
          }

          div {
            font-size: 1.6rem;
            margin: 20px auto;
          }

          img {
            max-height: 35vh;
            max-width: 100%;
            height: auto;
          }

          a {
            margin-top: 2rem;
            background-color: $orange-color;
            padding: .6rem 1rem;
            color: $white-color;
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            font-size: 2.4rem;
            cursor: pointer;
            text-decoration: none;

            &:hover {
              background-color: #f58136;
            }
          }
        }

        @media screen and (max-width: 480px) {
          section {
            h1 {
              font-size: 3.5rem;
            }

            h3 {
              font-size: 2.3rem;
            }

            div {
              font-size: 1.3rem;
            }

            a {
              font-size: 1.8rem;
            }
          }
        }
      `}</style>
    </>
  )
}
