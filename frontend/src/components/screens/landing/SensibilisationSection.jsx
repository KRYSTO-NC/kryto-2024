import { Link } from 'react-router-dom'
import sensibilisationImg from '../../../assets/img/plastic_paillettes_2.jpeg'
import { FaChevronCircleRight } from 'react-icons/fa'

const SensibilisationSection = () => {
  return (
    <section className='solution flex-columns'>

    <div className="row">


    <div className="column">
        <div className="column-2  bg-primary">

           <h4>Des produits utiles et  design fabriquée à partir de déchet</h4>
           <p>
            Chez Krysto nous avons à coeur de vous proposer des produits utiles et design fabriqués à partir de déchets plastique collecté localement.
           </p>
           <p>
            Nous transformons les déchets en trésors
           </p>
            <Link to={'/comment-nous-recyclons'}  className='btn btn-dark'>
                <FaChevronCircleRight/>
                En savoir plus</Link>
        </div>
    </div>
    <div className="column">
        <div className="column-1">
            <img src={sensibilisationImg} alt="" />
        </div>
    </div>
    </div>
</section>
  )
}

export default SensibilisationSection