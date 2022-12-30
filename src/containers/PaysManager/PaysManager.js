import React, { Component } from 'react';
import Titre from "../../components/Titres/TitreH1";
import Bouton from "../../components/Bouton/Bouton";
import axios from "axios";
import Pays from "./Pays/Pays";

class PaysManager extends Component {
    state = {
        listePays: [],
        loading : false,
        regionSelection: null,
        numeroPageActuel : 1,
    }

    componentDidMount = () => {
       this.handleSelectionPaysParRegion('all')
    }

    handleSelectionPaysParRegion = (region) => {
        let param='';
        if(region === "all") param=region;
        else param=`region/${region}`;

        this.setState({loading:true});
        axios.get(`https://restcountries.com/v2/${param}`)
            .then(reponse => {
                const listePays = reponse.data.map(pays => {
                    return {
                        nom : pays.name,
                        nomFrancais : pays.translations.fr,
                        capitale : pays.capital,
                        region : pays.region,
                        drapeau : pays.flag,                        
                    }
                })
                this.setState({
                    listePays,
                    loading:false,
                    regionSelection:region,
                    numeroPageActuel: 1
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading:false});
            })
    }

    render() {
        let pagination = [];
        let listePays = ""
        if(this.state.listePays) {
            let fin = this.state.listePays.length/10;
            if(this.state.listePays.length % 10 !== 0) fin++;
            for(let i=1; i <= fin ; i++){
                pagination.push(
                    <Bouton 
                        key={i} 
                        typeBtn="btn-info" 
                        estSelection={this.state.numeroPageActuel===i}
                        clic={() => this.setState({numeroPageActuel:i})}
                        >{i}</Bouton>
                );
            }
            const debut = (this.state.numeroPageActuel-1)*10;//0*10 = 0 / 1 * 10 = 10 / 2 * 10 = 20            
            const finListe = (this.state.numeroPageActuel-1)*10 + 10; // 0 * 10 + 10 = 10 / 1* 10 + 10 = 20 / 2 * 10 + 10 = 30
            const listeReduite = this.state.listePays.slice(debut,finListe);
            
            listePays = listeReduite.map(pays => {
                    return (
                        <div className="col-12 col-md-6" key={pays.nom}>
                            <Pays {...pays} {...this.props}/>
                        </div>
                    );
                })
        }
        return (
            <div className="container">
                <Titre>Liste des pays du monde</Titre>
                <Bouton 
                    typeBtn="btn-info" 
                    clic={() => this.handleSelectionPaysParRegion("all")}
                    estSelection={this.state.regionSelection==="all"}
                    >Tous</Bouton>
                <Bouton 
                    typeBtn="btn-info" 
                    clic={() => this.handleSelectionPaysParRegion("Europe")}
                    estSelection={this.state.regionSelection==="Europe"}
                    >Europe</Bouton>
                <Bouton 
                    typeBtn="btn-info" 
                    clic={() => this.handleSelectionPaysParRegion("Africa")}
                    estSelection={this.state.regionSelection==="Africa"}
                    >Afrique</Bouton>
                <Bouton 
                    typeBtn="btn-info" 
                    clic={() => this.handleSelectionPaysParRegion("Asia")}
                    estSelection={this.state.regionSelection==="Asia"}
                    >Asie</Bouton>
                <Bouton 
                    typeBtn="btn-info" 
                    clic={() => this.handleSelectionPaysParRegion("Americas")}
                    estSelection={this.state.regionSelection==="Americas"}
                    >Amérique</Bouton>
                <Bouton 
                    typeBtn="btn-info" 
                    clic={() => this.handleSelectionPaysParRegion("Oceania")}
                    estSelection={this.state.regionSelection==="Oceania"}
                    >Océanie</Bouton>
                    Nombre de pays : <span className='btn btn-success'>{this.state.listePays.length}</span>
                {
                    this.state.loading 
                    ? <div>Chargement...</div>
                    : <div className="row no-gutters">
                        {listePays}
                    </div>
                }
                <div>{pagination}</div>
            </div>
        );
    }
}

export default PaysManager;
