<template>
    <div class="card mb-3">
        <div class="container">
           <div class="row d-flex align-items-center">
               <div class="row col-2">

                   <div class="col-6">
                       <img :src="transportModeImage" v-bind:alt="legInfo.mode.line" class="typeLogo">
                   </div>

                   <div v-if="['rail', 'train', 'bus', 'tram', 'transilien'].includes(legInfo.mode.transport_mode)" class="col-6">
                       <img :src="lineImage" v-bind:alt="legInfo.mode.line" class="typeLogo">
                   </div>
                   <div v-if="['publicScooter', 'publicBike'].includes(legInfo.mode.transport_mode)" class="col-6">
                       <img :src="providerImage" v-bind:alt="legInfo.mode.line" class="typeLogo">
                   </div>
               </div>
               <div class="col-8 align-left">
                   <h5 class="legTitle">{{transportEquivalent[legInfo.mode.transport_mode]}}</h5>
                   <!-- Show information depending on the type of legs -->
                   <ul v-if="['rail', 'train', 'bus', 'tram', 'transilien'].includes(legInfo.mode.transport_mode)">
                       <li><strong>Ligne :</strong> {{legInfo.mode.line}}</li>
                       <li><strong>Destination :</strong> {{legInfo.mode.transport_destination}}</li>
                       <li><strong>Départ :</strong> {{legInfo.mode.origin_station}}</li>
                       <li><strong>Arrivée :</strong> {{legInfo.mode.destination_station}}</li>
                   </ul>

                   <ul v-else>
                       <li><strong>Départ :</strong> {{legInfo.origin}}</li>
                       <li><strong>Arrivée :</strong> {{legInfo.destination}}</li>
                   </ul>

               </div>
               <div class="col-2 text-center">
                   <p class="duration">{{Math.ceil(legInfo.duration / 60)}} min</p>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Leg",
        props: {
            legInfo: {
                type: Object,
                default: function() {
                    return {};
                }
            },
        },
        data() {
            return {
                transportEquivalent: {
                    "pedestrian": "Marche",
                    "bike": "Vélo",
                    "train": "RER",
                    "rail": "Métro",
                    "car": "Voiture",
                    "scooter": "Trotinette Electrique",
                    "bus": "Bus",
                    "publicScooter": "Trotinette Libre Service",
                    "publicBike": "Vélib",
                    "transilien": "Transilien"
                }
            }
        },
        computed: {
            transportModeImage() {
                let transportMode = this.legInfo.mode.transport_mode;
                try {
                    return require(`@/assets/${transportMode}.png`);
                } catch (e) {
                    return require(`@/assets/bus.png`)
                }
            },
            lineImage() {
                let line = this.legInfo.mode.line;
                let transportMode = this.legInfo.mode.transport_mode;
                try {
                    return require(`@/assets/${transportMode}${line}.png`);
                } catch (e) {
                    return require(`@/assets/bus.png`)
                }
            },
            providerImage() {
                let provider = this.legInfo.mode.provider;
                try {
                    return require(`@/assets/${provider}.png`);
                } catch (e) {
                    return require(`@/assets/Lime.png`)
                }
            }
        }
    }
</script>

<style scoped>
.typeLogo {
    height: 50px;
    width: 50px;
}

.legTitle {
    font-weight: bold;
}
</style>