import React from 'react'
import plasticPile from '../../../assets/img/plasticpile.svg'
import thermo from '../../../assets/img/thermo.jpg'
import thermoExemple from '../../../assets/img/thermoexemple.jpg'
import thermoExemple2 from '../../../assets/img/thermoexemplle2.jpg'
import polutPlast from '../../../assets/img/tortue_plastic_2.jpeg'
import { useGetPlasticTypesQuery } from '../../../slices/plasticTypesApiSlice'

const PlasticExplainScreen = () => {

    const {data:plasticTypes, isLoading:isLoadingPlasticTypes, error:errorPlasticTypes} = useGetPlasticTypesQuery()

    if (isLoadingPlasticTypes) {
        return <div>Loading...</div>
    }
    if (errorPlasticTypes) {
        return <div>Error: {errorPlasticTypes.data.message}</div>
    }
  return (
    <div className="container">
      <h1>Le plastique</h1>
      <p>
        Qu'est-ce que le plastique? D’où provient-il? Combien en utilisons-nous
        et qu'est-ce qui est recyclé ? Quels sont les différents types de
        plastique et comment les reconnaître ?
      </p>
      <div className="fact">
        <strong>Conseil d'expert: </strong> <br />
        regardez sous un produit en plastique et voyez s’il comporte un petit
        triangle entourant un chiffre. Ce chiffre indique la catégorie du
        plastique, cela aide à retrouver son type.
      </div>

      <h2>Qu'est-ce que le plastique?</h2>
      <p>Le plastique est partout autour de nous.</p>
      <div className="full-img">
        <img src={plasticPile} alt="Plastic pile" />
      </div>

      <p>
        Le mot plastique fait partie du vocabulaire courant depuis longtemps,
        mais que signifie-t-il réellement? Le mot est dérivé du grec “plastikos”
        qui signifie “capable d'être formé ou moulé”, faisant référence à la
        malléabilité du matériau lors de sa transformation. Cette propriété
        permet au plastique d'être coulé, pressé ou extrudé pour obtenir des
        formes variées - des films, des fibres, des plaques, des tubes, des
        bouteilles, etc...
      </p>
      <p>
        Les plastiques sont des produits chimiques de synthèse extraits
        principalement du pétrole et fabriqués à partir d'hydrocarbures (chaînes
        composées d'atomes d'hydrogène et de carbone). La plupart des plastiques
        sont des polymères, de longues molécules composées de nombreuses
        répétitions d'une molécule de base appelée monomère. C’est cette
        structure particulière qui rend le plastique particulièrement durable et
        résistant dans le temps.
      </p>
      <p>
        En raison de leur coût relativement faible, de leur facilité de
        fabrication et de leur polyvalence, les plastiques sont utilisés dans
        une part énorme et croissante de produits : des bouteilles de shampooing
        aux fusées spatiales. L'omniprésence et le volume même de la production
        de plastique (on en trouve partout!) causent de graves dommages à
        l'environnement en raison de sa lente décomposition (des études récentes
        disent 500 ans) garantie par les liaisons fortes entre ses molécules.
      </p>

      <div className="fact">
        <strong>Pensez-y de cette façon... </strong>
        tous les plastiques utilisés par vos parents, vos grands-parents et vos
        arrière-grands-parents sont toujours là et pollueront la planète pendant
        encore quatre siècles.
      </div>
      <p>
        La plupart des plastiques sont mélangés à d'autres composés organiques
        ou inorganiques, appelés additifs, dont le rôle est d’améliorer les
        performances ou de réduire les coûts de production. La quantité
        d'additifs varie largement en fonction de l'application et du type de
        plastique.
      </p>
      <h4>
        Donc vous pouvez en trouver partout dans le monde, et il se retrouve
        dans des endroits où nous ne voudrions certainement pas qu'il soit...
      </h4>

      <div className="full-img">
        <img src={polutPlast} alt="Plastic pile" />
      </div>

      <h1>
        Nous produisons plus de 300 millions de tonnes métriques de plastique
        neuf chaque année
      </h1>
      <p>
        Ce qui n'est pas très intelligent, surtout quand nous avons tellement de
        matière déjà existante que nous pourrions utiliser. Le plastique vierge
        est fabriqué à partir de pétrole, un précieux combustible fossile dont
        nous manquons ; il est utilisé pour fabriquer des produits bon marché
        qui sont destinés à être jetés après une très courte période
        d'utilisation. Ce n'est pas très malin. Et comme moins de 10% du
        plastique produit est effectivement recyclé, le reste finit dans les
        décharges, dans l'océan ou est brûlé. Hein?
      </p>

      <div className="fact">
        En parallèle de vouloir le recycler, il est important que chacun cherche
        à réduire son utilisation de plastique neuf.
      </div>

      <h1>Différents types de plastique</h1>
      <p>
        Premièrement, il existe deux grandes catégories de plastique : les
        thermoplastiques et les thermodurcissables.
      </p>
      <div className="full-img">
        <img src={thermo} alt="Plastic pile" />
      </div>
      <h1>Thermodurcissables</h1>
      <p>
        Les plastiques thermodurcissables contiennent des polymères qui se
        réticulent et créent une liaison irréversible, ce qui signifie qu'ils ne
        peuvent pas être refondus - une fois leur forme prise, ils seront
        solidifiés pour toujours.
      </p>
      <div className="fact">
        <strong>
          Considérez les plastiques thermodurcissables comme du pain:{' '}
        </strong>
        une fois que le pain est fait, si vous essayez de le chauffer, il brûle.
        Aucun de ces plastiques ne peut être recyclé.
      </div>
      <p>Voici quelques exemples de plastiques thermodurcissables:</p>
      <div className="full-img">
        <img src={thermoExemple} alt="" />
      </div>
      <h1>Thermoplastiques</h1>
      <p>
        Les thermoplastiques sont des polymères plastiques qui deviennent mous
        lorsqu'ils sont chauffés et durs une fois refroidis. Les matériaux
        thermoplastiques peuvent être refroidis et chauffés plusieurs fois:
        lorsqu'ils sont chauffés, ils fondent et redeviennent durs lorsqu'ils
        refroidissent.
      </p>
      <div className="fact">
        <strong>Considérez les thermoplastiques comme du beurre: </strong> il
        peut être chauffé et refroidi plusieurs fois, il fond et se fige à
        nouveau.
      </div>
      <p>Exemples de thermoplastiques:</p>
      <div className="full-img">
        <img src={thermoExemple2} alt="" />
      </div>
      <p>
        Heureusement, 80% des plastiques dans le monde sont des thermoplastiques
        (🎉), ce qui signifie qu'ils peuvent être recyclés et transformés. Les
        thermoplastiques (que nous appellerons simplement plastique) sont
        divisés en sous-catégories supplémentaires en fonction de leur structure
        et de leurs propriétés, et peuvent être reconnus par leur nom ou numéro
        qui doit généralement être imprimé ou estampé quelque part sur vos
        objets.
      </p>
      <p>
        Ils sont classé de 1 à 7, et chaque numéro correspond à un type de plastique au propriété spécifique.
      </p>

        <h1>Les différents types de plastique</h1>
        {plasticTypes.data.map((type) => (
            <div className='plastic-type-card' key={type._id}>
                <div className="icone-sigle">

                <img src={type.images[0]} alt="" />
                </div>
                <p>
                    <h3>{type.scientificNameFr}</h3> <br />
                    <h4>Sigle (FR): {type.sigleFr} </h4>  <br />
                    <p>{type.description}</p>

                    <p>{type.environmentalImpact}</p>
                </p>
                </div>
            ))}
    </div>
  )
}

export default PlasticExplainScreen
