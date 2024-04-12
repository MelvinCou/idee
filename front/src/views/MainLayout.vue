<script setup lang="ts">
import { ref } from "vue";
import CardDetails from "./CardDetails.vue";
export interface CardData {
  title: string;
  img: string;
  publicDescription: string;
  wikipediaDescription: string;
  address: string;
  location: string;
  webSite: string;
  dataProduceur: string;
  dateUpdate: string;
}
let showDetails = ref(false);
const detailsData = ref<CardData>({
  title: "initialise",
  img: "",
  publicDescription: "",
  wikipediaDescription: "",
  address: "",
  location: "",
  webSite: "",
  dataProduceur: "",
  dateUpdate: "",
});

function displayDetail(data: CardData) {
  detailsData.value = data;
  if (detailsData.value) {
    showDetails.value = !showDetails.value;
  }
}
function rollBack(isRollBack: boolean) {
  showDetails.value = isRollBack;
}
//! Fix : last data is hiden
//! TODO: define city deestination to draw a path
const cardDataDump: CardData[] = [
  {
    title: "titre 1 ",
    img: "https://imgs.search.brave.com/uR3JIRMEprA76IrE7lzkvSbXdiS5-BZmdhCKAsVotPI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQLzEwNDAz/MTU5NzYuanBn",
    publicDescription:
      "Dernier château des bords de Loire avant l’océan, ce monument montre le raffinement architectural de la cour de Bretagne. Fait rare, il est librement accessible, des douves aux remparts.",
    wikipediaDescription:
      "Le château des ducs de Bretagne est un château défensif et de plaisance situé à Nantes, dans le département de la Loire-Atlantique en France. Classé monument historique depuis 1840, il a principalement été construit au XVe siècle mais il comprend aussi des éléments datant du XIVe au XVIIIe siècle. Fondé par les ducs de Bretagne au XIIIe siècle pour constituer une base défensive à Nantes, le château est devenu, sous François II, la principale résidence ducale bretonne. Sa fonction militaire est également utilisée par le duc lors de la Guerre folle au cours de laquelle il s'oppose au roi de France. Sa fille, la duchesse Anne, est plus tard contrainte d'épouser deux rois de France successifs, Charles VIII et Louis XII. Ces mariages entraînent l'union de la Bretagne à la France, définitivement scellée par un édit signé au château en 1532, par François Ier. Dès lors, le château perd son statut de résidence ducale pour devenir une forteresse royale. Il voit passer la plupart des rois de France, lorsque ceux-ci visitent la Bretagne, et il est la résidence officielle des gouverneurs de la province. Néanmoins, les séjours de ces derniers sont généralement brefs, à l'exception notable du duc de Mercœur, un gouverneur qui y tient une cour pendant les guerres de Religion. Sous l'Ancien Régime, le château sert aussi de prison d'État, et surtout de caserne et d'arsenal militaire. Il ne subit aucune dégradation pendant la Révolution, mais l'explosion des réserves de poudre, en 1800, détruit une bonne part du monument. Au XIXe siècle, le château conserve sa fonction militaire, mais son intérêt patrimonial est peu à peu découvert et quelques restaurations sont entreprises. Propriété de la ville de Nantes à partir de 1915, il devient un musée en 1924. De 1990 à 2007, il bénéficie d’une rénovation de grande ampleur et il accueille, depuis 2007, le musée d'Histoire de Nantes.",
    address: "Nantes 44000",
    location: "47.2161732 - -1.5493331",
    webSite: "https://www.chateaunantes.fr/",
    dataProduceur: "eSPRIT Pays de la Loire Contacter par email",
    dateUpdate: "2023-05-11",
  },
  {
    title: "Château de Villandry",
    img: "https://imgs.search.brave.com/Er5z9IQQ6pcZdPA3oo3jBGS3l8DM1I4jM0b0_sUCQ10/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5qaW1jZG4uY29t/L2FwcC9jbXMvaW1h/Z2UvdHJhbnNmL2Rp/bWVuc2lvbj0xOTIw/eDQwMDpmb3JtYXQ9/anBnL3BhdGgvc2E2/NTQ5NjA3Yzc4ZjVj/MTEvaW1hZ2UvaTZm/MGJkN2VjNTE4NWRi/NWYvdmVyc2lvbi8x/NDUzNDcwMzkyL2lt/YWdlLmpwZw",
    publicDescription:
      "Le château de Villandry est un château de la Loire français situé dans la commune de Villandry, dans le département d'Indre-et-Loire en région Centre-Val de Loire. Il est réputé pour ses jardins à la française.",
    wikipediaDescription:
      "Le château de Villandry est un château de la Loire français situé dans la commune de Villandry, dans le département d'Indre-et-Loire en région Centre-Val de Loire. Il est réputé pour ses jardins à la française, considérés comme un des chefs-d'œuvre de l'art des jardins de la Renaissance. Le château a été construit au XVIe siècle par Jean Le Breton, ministre des finances de François Ier. Le château est de style Renaissance et se compose d'un corps de logis principal flanqué de quatre tours rondes. Les jardins de Villandry sont divisés en plusieurs parties, chacune ayant un style et une thématique propres. On trouve ainsi un jardin potager décoratif, un jardin d'eau, un jardin d'ornement et un labyrinthe.",
    address: "Villandry 37510",
    location: "47.3804139 -0.5772222",
    webSite: "https://www.chateauvillandry.fr/",
    dataProduceur: "eSPRIT Centre-Val de Loire Contacter par email",
    dateUpdate: "2023-05-11",
  },
  {
    title: "Château d'Angers",
    img: "https://imgs.search.brave.com/K4S29PmvDUhi8YmYL5fu2qCnHYbDj1ja9x2O0FOMMtc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hcGl3/cC50aGVsb2NhbC5j/b20vY2RuLWNnaS9p/bWFnZS9mb3JtYXQ9/d2VicCx3aWR0aD04/NTAscXVhbGl0eT03/NS9odHRwczovL2Fw/aXdwLnRoZWxvY2Fs/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOC8wMi9mNTY2/MDViNmZiNjFhMjUz/Yjc5OTVjNGRhY2Jk/ODY5ZTA1MDE3ZmM4/ZGM5NjM2ZTkyYTFk/YTE3ZDk3ZWZiZGZj/LmpwZw",
    publicDescription:
      "Le château d'Angers est un château fort médiéval situé à Angers, dans le département de Maine-et-Loire en région Pays de la Loire.",
    wikipediaDescription:
      "Le château d'Angers est un château fort médiéval situé à Angers, dans le département de Maine-et-Loire en région Pays de la Loire. Il est l'un des plus grands châteaux forts d'Europe. La construction du château a débuté au IXe siècle par les comtes d'Anjou et s'est poursuivie jusqu'au XVe siècle. Le château est constitué d'une enceinte fortifiée flanquée de 17 tours massives. À l'intérieur de l'enceinte se trouve un donjon carré, appelé le « Logis royal », qui abrite aujourd'hui la Tenture de l'Apocalypse, la plus grande tapisserie médiévale au monde. Le château d'Angers a servi de résidence aux comtes, puis aux ducs d'Anjou, et a joué un rôle important dans l'histoire de la France.",
    address: "Angers 49000",
    location: "47.4700000 -0.5597222",
    webSite: "https://www.chateau-angers.fr/",
    dataProduceur: "eSPRIT Pays de la Loire Contacter par email",
    dateUpdate: "2023-05-11",
  },
  {
    title: "Château de Chambord",
    img: "https://imgs.search.brave.com/Gwk1VgJ4vXCQYJ_Zlyp8bbYhnqZWK-KuE0pO1Smfym0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5qaW1jZG4uY29t/L2FwcC9jbXMvaW1h/Z2UvdHJhbnNmL2Rp/bWVuc2lvbj00MzB4/MTAwMDA6Zm9ybWF0/PWpwZy9wYXRoL3Nh/NjU0OTYwN2M3OGY1/YzExL2ltYWdlL2kz/NDhjNThhOTFjZjU5/MzMyL3ZlcnNpb24v/MTQ0NjI5OTExOC90/aGUtYXJ0LXRyYWls/LWluLW5hbnRlcy5q/cGc",
    publicDescription:
      "Le château de Chambord est un château royal français situé dans la commune de Chambord, dans le département du Loir-et-Cher en région Centre-Val de Loire.",
    wikipediaDescription:
      "Le château de Chambord est un château royal français situé dans la commune de Chambord, dans le département du Loir-et-Cher en région Centre-Val de Loire. Situé au cœur d'un domaine forestier de plus de 5 440 hectares, à l'ouest de la ville de Blois, il est l'un des plus grands châteaux du monde et l'un des plus célèbres de la Loire. La construction du château a été décidée par François Ier en 1519, sur les plans de l'architecte Domenico da Cortona, dit le Boccador. Le chantier a duré plus de trente ans et n'a jamais été véritablement achevé. Le château est un exemple de l'architecture française de la Renaissance, avec ses façades richement décorées, ses toits à la française et ses intérieurs somptueux. Il est également célèbre pour son escalier à double révolution, conçu par Léonard de Vinci.",
    address: "Chambord 41250",
    location: "47.6142375 -1.5169444",
    webSite: "https://www.chambord.fr/",
    dataProduceur: "eSPRIT Centre-Val de Loire Contacter par email",
    dateUpdate: "2023-05-11",
  },
  {
    title: "Château du Clos Lucé",
    img: "https://imgs.search.brave.com/ngWtIkxw2GaINoCS7QFNtigi29bgMjVr0H_XpekL-Ak/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/YmVzdGxvY2F0aW9u/aG90ZWxzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/NS9JbGUtZGUtTmFu/dGVzLS5qcGc",
    publicDescription:
      "Le château du Clos Lucé est un château de la Renaissance situé dans la commune d'Amboise, dans le département d'Indre-et-Loire en région Centre-Val de Loire.",
    wikipediaDescription:
      "Le château du Clos Lucé est un château de la Renaissance situé dans la commune d'Amboise, dans le département d'Indre-et-Loire en région Centre-Val de Loire. Il est surtout connu pour avoir été la dernière demeure de Léonard de Vinci, qui y a vécu de 1515 à sa mort en 1519, à l'invitation du roi François Ier. Le château du Clos Lucé a été construit au XVe siècle par Hugues Bouchard, comte de L'Isle- Bouchard. Il a été ensuite agrandi et embelli par plusieurs propriétaires successifs. François Ier l'a offert à Léonard de Vinci en 1515, en guise de résidence et d'atelier. Léonard de Vinci y a passé les trois dernières années de sa vie et y est mort le 2 mai 1519. Le château du Clos Lucé abrite aujourd'hui un musée consacré à Léonard de Vinci et à ses inventions.",
    address: "Amboise 37400",
    location: "47.3777778 -0.5802778",
    webSite: "https://www.closluce.fr/",
    dataProduceur: "eSPRIT Centre-Val de Loire Contacter par email",
    dateUpdate: "2023-05-11",
  },
  {
    title: "Cathédrale Saint-Étienne de Metz",
    img: "https://imgs.search.brave.com/JdCyDA-TBRE8XlPPZtwnvR__4lLYU4iKjKMsdO-S16w/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5qaW1jZG4uY29t/L2FwcC9jbXMvaW1h/Z2UvdHJhbnNmL2Rp/bWVuc2lvbj0xOTIw/eDQwMDpmb3JtYXQ9/anBnL3BhdGgvc2E2/NTQ5NjA3Yzc4ZjVj/MTEvaW1hZ2UvaWM3/NTM1YWQzY2NhZmFk/Y2QvdmVyc2lvbi8x/NTExNTQ3ODMwL2lt/YWdlLmpwZw",
    publicDescription:
      "La cathédrale Saint-Étienne de Metz est une cathédrale catholique romaine située à Metz, en Moselle, en région Grand Est. C'est l'un des plus beaux exemples d'architecture gothique flamboyant en Europe.",
    wikipediaDescription:
      "La cathédrale Saint-Étienne de Metz est une cathédrale catholique romaine située à Metz, en Moselle, en région Grand Est. C'est l'un des plus beaux exemples d'architecture gothique flamboyant en Europe. La construction de la cathédrale a débuté au XIIIe siècle et s'est poursuivie jusqu'au XVIe siècle. Elle est célèbre pour ses vitraux, considérés comme l'un des plus grands ensembles de vitraux du Moyen Âge en Europe. La cathédrale Saint-Étienne de Metz est également connue pour sa tour de la Mutte, haute de 85 mètres, qui offre une vue panoramique sur la ville.",
    address: "Metz 57000",
    location: "49.1166667 -6.1833333",
    webSite: "https://www.cathedrale-metz.fr/",
    dataProduceur: "eSPRIT Grand Est Contacter par email",
    dateUpdate: "2023-05-11",
  },
];
</script>

<template>
  <v-navigation-drawer color="pink" permanent width="470">
    <v-expand-x-transition>
      <CardDetails
        v-show="showDetails"
        @back="rollBack"
        :is-click="showDetails"
        :title="detailsData.title"
        :img="detailsData.img"
        pins="{detailsData.title}"
        :public-description="detailsData.publicDescription"
        :wikipedia-description="detailsData.wikipediaDescription"
        :address="detailsData.address"
        :location="detailsData.location"
        :web-site="detailsData.webSite"
        :data-produceur="detailsData.dataProduceur"
        :date-update="detailsData.dateUpdate">
      </CardDetails>
    </v-expand-x-transition>

    <v-data-iterator :items="cardDataDump">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <v-card>
            <div v-if="item" @click="displayDetail(item.raw)">
              <v-card-title> {{ item.raw.title }} </v-card-title>
              <v-img :width="100" :height="100" aspect-ratio="16/9" cover :src="item.raw.img">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </div>
            <v-progress-circular
              v-else
              color="grey-lighten-4"
              indeterminate
              size="64"></v-progress-circular>
            <v-card-actions>
              <v-btn color="green">+</v-btn>
              <v-btn color="red">-</v-btn>
            </v-card-actions>
          </v-card>

          <br />
        </template>
      </template>
    </v-data-iterator>
  </v-navigation-drawer>
  <v-main>
    <!-- Content -->
    <v-layout full-height>
      <v-row>
        <v-col>
          <v-sheet :height="200" :width="200" color="red-lighten-3"></v-sheet>
        </v-col>
      </v-row>
    </v-layout>
  </v-main>
</template>

<style scoped>
.v-navigation-drawer {
  position: relative;
}

.app-bar {
  color: black;
}
.nav-icon {
  background-color: rebeccapurple;
}
.bar-title {
  background-color: aliceblue;
}
</style>
