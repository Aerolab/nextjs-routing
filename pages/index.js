import 'isomorphic-fetch'
import Link from 'next/link'
import Router from 'next/router'
import Layout from '../components/Layout'
import { format } from 'url'

export default class extends React.Component {

  static async getInitialProps() {
    const req = await fetch('https://kiteapi.herokuapp.com/dribbble/shots')
    const dribbble = await req.json()

    return { shots: dribbble.shots }
  }

  handleEsc = (e) => {
    if( e.keyCode !== 27 ) return
    if( ! this.props.url.query.shot ) return

    Router.push('/', '/', { shallow: true })
  }

  componentWillReceiveProps(props) {
    console.log(props)
  }

  componentDidMount() {
    Router.replace(this.props.url, this.props.url, { shallow: true })
    document.addEventListener('keydown', this.handleEsc)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc)
  }

  shotClick = (e, shot) => {
    if ( e.metaKey || e.ctrlKey || e.shiftKey || (e.nativeEvent && e.nativeEvent.which === 2) ) {
      // Proceed as usual for new tab / new window shortcut
      return
    }
    e.preventDefault();

    const yolo = JSON.stringify(shot)

    Router.push({ pathname: '/', query: { shot: yolo } },
                { pathname: '/shot', query: { shot: yolo } }, 
                { shallow: true } )
  }

  render() {
    const previewShot = this.props.url.query.shot ? JSON.parse(this.props.url.query.shot) : null

    return <Layout title={ previewShot ? previewShot.title : "Latest Shots" }>
      <h1>Latest Shots</h1>

      { previewShot &&
        <div className="fullscreen">
          <img src={ previewShot.images.hidpi } />
        </div>
      }

      <div className="shots">
        { this.props.shots.map( (shot) => (
          <a href={ format( { pathname: '/shot', query: { shot: JSON.stringify(shot) } } ) } 
             onClick={(e) => { this.shotClick(e, shot); }} >
            <img src={ shot.images.hidpi } alt={ shot.title } />
          </a>
        ) ) }
      </div>

      <style jsx>{`
        h1 {
          text-align: center;
          font-weight: 200;
          color: #333;
        }
        .shots {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          grid-gap: 1em;
          margin: 1em;
        }
        .shots img {
          width: 100%;
        }
        .fullscreen {
          background: rgba(0,0,0,0.6);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 1em;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fullscreen img {
          max-width: 100%;
          max-height: 100%;
          box-shadow: 0 7px 15px rgba(0,0,0,0.2);
        }
      `}</style>
    </Layout>
  }

}