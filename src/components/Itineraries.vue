<template>
    <div class="container">
        <div class="row">
            <div class="col-10 offset-1 text-center">
                <div>
                    <b-jumbotron
                            header="CentraleMapper"
                            lead="Le meilleur site pour trouver son chemin !"
                            id="leadJumbotron"
                    ></b-jumbotron>
                </div>
                <b-button v-b-modal.itineraries-modal class="btn btn-success">Nouvel Itinéraire</b-button>
                <br><br>
                <div class="card mb-3" v-for="(itinerary, index) in itineraries" :key="index">
                    <div class="card-header">
                        {{itinerary.type}}
                    </div>
                    <div class="card-body">
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
                        label="Origin:"
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
                        :options="options"
                        name="vehicles"></b-form-checkbox-group>
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
                },

                options: [
                    { text: 'Car', value: 'car'},
                    { text: 'Bike', value: 'bike'},
                    { text: 'Scooter', value: 'scooter'},
                ]
            };
        },
        components: {
            Leg,
            Places
        },
        methods: {
            getItineraries() {
                const path = 'http://localhost:5000/itineraries';
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
                const path = 'http://localhost:5000/itineraries';
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
                    origin: `(${this.itinerariesForm.origin.lat},${this.itinerariesForm.origin.lng})`,
                    destination: `(${this.itinerariesForm.destination.lat},${this.itinerariesForm.destination.lng})`,
                    vehicles: this.itinerariesForm.vehicles
                }
                this.calculateItineraries(payload);
            },
        },
        created() {
            this.getItineraries();
        }
    }
</script>

<style scoped>
#leadJumbotron {
    background: rgba(255, 255, 255, 0.7);
}
</style>