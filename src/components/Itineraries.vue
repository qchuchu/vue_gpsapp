<template>
    <div class="container">
        <div class="row">
            <div class="col-10 offset-1">
                <div class="text-center">
                    <b-jumbotron
                            header="CentraleMapper"
                            lead="Le meilleur site pour trouver son chemin !"
                            id="leadJumbotron"
                    ></b-jumbotron>
                </div>
                <div class="text-center">
                    <b-button v-b-modal.itineraries-modal class="btn btn-success">Nouvel Itinéraire</b-button>
                </div>
                <br>
                <div class="card mb-3" v-for="(itinerary, index) in itineraries" :key="index">
                    <div class="card-header text-center">
                        <h3>{{typeMapping[itinerary.type]}}</h3>
                    </div>
                    <div class="card-body leg">
                        <Leg
                                v-for="(leg, indexLeg) in itinerary.legs" :key="indexLeg"
                                :leg-info="leg"
                        ></Leg>
                    </div>
                </div>
            </div>
        </div>
        <b-modal
                ref="calculateItinerariesModal"
                id="itineraries-modal"
                title="Calcul d'un nouvel itinéraire"
                hide-footer>
            <b-form class="w-100" @submit="onSubmit">

                <!-- Origin -->
                <b-form-group id="form-origin-group"
                        label="Origine:"
                        label-for="form-origin-input">
                    <places
                            id="form-origin-input"
                            v-model="originLabel"
                            placeholder="Adresse de Départ"
                            @change="val => { itinerariesForm.origin = val.latlng }"
                            :options="{ countries: ['FR'] }"
                    ></places>
                </b-form-group>

                <!-- Destination -->
                <b-form-group id="form-destination-group"
                              label="Destination:"
                              label-for="form-destination-input">
                    <places
                            id="form-destination-input"
                            v-model="destinationLabel"
                            placeholder="Adresse d'Arrivée"
                            @change="val => { itinerariesForm.destination = val.latlng }"
                            :options="{ countries: ['FR'] }"
                    ></places>
                </b-form-group>

                <!-- Vehicles -->
                <b-form-group id="form-vehicles-group" label="Quels véhicules possédez-vous ?">
                    <b-form-checkbox-group
                        id="vehicles-checkbox-group"
                        v-model="itinerariesForm.vehicles"
                        :options="optionsVehicles"
                        name="vehicles"></b-form-checkbox-group>
                </b-form-group>
                <!-- Mode -->
                <b-form-group label="Options de trajet">
                    <b-form-radio-group
                        v-model="itinerariesForm.mode"
                        :options="optionsMode"
                        name="mode-transport"
                    ></b-form-radio-group>
                </b-form-group>

                <!-- Alone -->
                <b-form-group>
                    <b-form-checkbox
                        v-model="itinerariesForm.alone"
                        value=false
                        unchecked-value=true
                    >Je suis accompagné</b-form-checkbox>
                </b-form-group>

                <!-- Loaded -->
                <b-form-group>
                    <b-form-checkbox
                            v-model="itinerariesForm.loaded"
                            value=true
                            unchecked-value=false
                    >Je suis chargé</b-form-checkbox>
                </b-form-group>

                <!-- Disabled -->
                <b-form-group>
                    <b-form-checkbox
                            v-model="itinerariesForm.disabled"
                            value=true
                            unchecked-value=false
                    >Je suis handicapé</b-form-checkbox>
                </b-form-group>

                <b-button-group>
                    <b-button type="submit" variant="primary">Calculer</b-button>
                </b-button-group>

            </b-form>
        </b-modal>
    </div>
</template>

<script>
    import axios from 'axios';
    import Leg from "./Leg";
    import Places from 'vue-places';
    export default {
        data() {
            return {
                itineraries: [],
                originLabel:null,
                destinationLabel:null,
                itinerariesForm: {
                    origin: {},
                    destination: {},
                    vehicles: [],
                    mode: "fastest",
                    alone: true,
                    loaded: false,
                    disabled: false
                },

                optionsVehicles: [
                    { text: 'Voiture', value: 'car'},
                    { text: 'Vélo', value: 'bike'},
                    { text: 'Trotinette Electrique', value: 'scooter'},
                ],
                optionsMode: [
                    { text: 'Plus rapide', value: 'fastest'},
                    { text: 'Moins cher', value: 'cheapest'},
                    { text: 'Moins d\'étapes', value: 'less_steps'},
                    { text: 'Plus court', value: 'shortest'}
                ],
                typeMapping: {
                    "publicBike": "Vélib",
                    "publicTransport": "RATP Style !",
                    "pedestrian": "Petit Footing ?",
                    "car": "En Voiture",
                    "bike": "À Vélo",
                    "scooter": "Trotinette Électrique",
                    "publicScooter": "Trotinette"
                }
            };
        },
        components: {
            Leg,
            Places
        },
        methods: {
            getItineraries() {
                const path = 'https://gpsapp-pooa-back-2.herokuapp.com/itineraries';
                axios.get(path)
                    .then((res) => {
                        this.itineraries = res.data.itineraries;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                    });
            },
            calculateItineraries(payload){
                const path = 'https://gpsapp-pooa-back-2.herokuapp.com/itineraries';
                axios.post(path, payload)
                    .then(() => {
                        this.getItineraries();
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.log(error);
                        this.getItineraries();
                    });
            },
            onSubmit(evt) {
                evt.preventDefault();
                this.$refs.calculateItinerariesModal.hide();
                const payload = {
                    origin: [this.itinerariesForm.origin.lat, this.itinerariesForm.origin.lng],
                    destination: [this.itinerariesForm.destination.lat, this.itinerariesForm.destination.lng],
                    vehicles: this.itinerariesForm.vehicles,
                    mode: this.itinerariesForm.mode,
                    alone: this.itinerariesForm.alone,
                    loaded: this.itinerariesForm.loaded,
                    disabled: this.itinerariesForm.disabled
                }
                this.calculateItineraries(payload);
            },
        }
    }
</script>

<style scoped>
#leadJumbotron {
    background: rgba(255, 255, 255, 0.7);
}

.leg {
    border: 0px;
}
</style>