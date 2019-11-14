<template>
    <div class="card mb-3">
        <div class="container">
           <div class="row">
               <div class="col-2">
                   <img :src="require(`@/assets/${legInfo.type}.png`)" v-bind:alt="legInfo.type" class="typeLogo">
               </div>
               <div class="col-10">
                   {{legInfo}}
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
            }
        },
        data() {
            return {
                imageEquivalent: {
                    "bus": "../assets/BUS.svg",
                    "metro": "../assets/metro.png",
                    "RER": "../assets/RER.png",
                    "tram": "../assets/TRAM.svg"
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
</style>