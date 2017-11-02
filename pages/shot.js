import Layout from '../components/Layout'

export default class extends React.Component {

  render() {
    const shot = JSON.parse( this.props.url.query.shot )

    return <Layout title={ shot.title }>
      <div>
        <h1>{ shot.title }</h1>
        <img src={ shot.images.hidpi } alt={ shot.title } />
      </div>

      <style jsx>{`
        div {
          margin: 1em;
        }
        h1 {
          text-align: center;
          font-weight: 200;
          color: #333;
        }
        img {
          width: 100%;
        }
      `}</style>
    </Layout>
  }
}
