import Head from 'next/head'

export default function Helmet() {
  return (
    <Head>
      <title>Nodes Guru - Casper World</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <meta property='og:image' content='https://api.nodes.guru/nodesguru.png'/>
      <meta name='twitter:card' content='summary_large_image'/>
      <meta property='twitter:domain' content='nodes.guru'/>
      <meta property='twitter:url' content='https://nodes.guru/'/>
      <meta name='twitter:title' content='Nodes Guru - Active & Upcoming crypto projects testnets and competitions'/>
      <meta name='twitter:description' content='Nodes Guru contains a full list with guides for testnet for all projects in crypto world.'/>
      <meta name='twitter:image' content='https://api.nodes.guru/nodesguru.png'/>
      <meta name='msapplication-TileColor' content='#da532c'/>
      <meta name='theme-color' content='#ffffff'/>
      <link rel="shortcut icon" href={"/favicon.ico"} />
    </Head>
  )
}
