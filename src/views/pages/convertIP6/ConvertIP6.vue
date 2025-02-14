<template>
  <v-sheet class="overflow-hidden" style="position: relative;">
    <v-container fluid class="px-5">
      <v-row>
        <v-col cols="12" md="12" class="px-5 pb-0">

          <!-- **** TOP BUTTON OPTION **** -->
          <v-chip-group active-class="primary primary--text" mandatory>
            <v-chip label outlined>
              <v-icon left color="primary">mdi-alphabet-latin</v-icon>
              Text
            </v-chip>
            <v-chip label outlined disabled>
              <v-icon left color="primary">mdi-image</v-icon>
              Image
            </v-chip>
            <v-chip label outlined disabled>
              <v-icon left color="primary">mdi-file</v-icon>
              File
            </v-chip>
          </v-chip-group>
          <!-- ==== END TOP BUTTON OPTION ====  -->
          <v-toolbar elevation="0" dense>


            <!-- **** HEADER TAB **** -->
            <v-tabs v-model="selectedTab" color="indigo ml-2" class="rounded-lg" next-icon="">
              <v-tab v-for="item in items" :key="item" :href="'#tab-' + item">
                {{ item }}
              </v-tab>

              <v-menu v-if="more.length" bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text class="align-self-center mr-4" v-bind="attrs" v-on="on">
                    more
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>

                <v-list class="grey lighten-3">
                  <v-list-item v-for="item in more" :key="item" @click="addItem(item)">
                    {{ item }}
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-tabs>
            <v-spacer></v-spacer>


            <v-spacer></v-spacer>


            <v-btn v-if="result" small class="rounded-lg elevation-0 mr-2" @click="onClickCopyButton()">
              <v-icon small>mdi-checkbox-multiple-blank-outline</v-icon>
            </v-btn>
            <v-tooltip left max-width="230px" v-model="showTooltipInformation">
              <template v-slot:activator="{ on, attrs }">
                <v-btn small @click="onClickInformationIcon()" class="rounded-lg elevation-0 mr-2">
                  <v-icon small>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>I'm powered by generative AI, so surprises and mistakes are possible. Make sure to verify any
                generated code or
                suggestions, and share feedback so we can learn and improve. Check out the Net AI Copilot documentation
                to learn
                more.</span>
            </v-tooltip>

            <v-btn small class="rounded-lg elevation-0 mr-2" @click="onClickDeleteButton()">
              <v-icon small>mdi-delete-outline</v-icon>
            </v-btn>

            <!-- <v-btn small class="rounded-lg elevation-0">
            Logs
            <v-icon small right>mdi-wrap-disabled</v-icon>
          </v-btn> -->

          </v-toolbar>
          <!-- ==== END HEADER TAB ==== -->
        </v-col>
        <!-- **** FORM SECTION **** -->
        <v-col cols="12" md="6" class="px-5 pt-0" style="border-right:1px solid rgba(0, 0, 0, 0.12);">

          <!-- ==== TAB CONTENT ==== -->
          <v-tabs-items v-model="selectedTab">
            <v-tab-item :value="'tab-' + 'IPv4 to IPv6'">
              <v-card flat>
                <v-card-text class="pt-0 pl-0">
                  <v-textarea v-model="form.ipv4" outlined auto-grow :hint="'IPv4 Configuration'"
                    :placeholder="'IPv4 Configuration'"></v-textarea>
                  <v-text-field v-model="form.ipv6block" label="IPv6 Block" clearable></v-text-field>
                  <v-btn depressed block class="rounded-lg" :loading="loading.button.process"
                    @click="onButtonProcessClick()">
                    Generate <v-icon right>mdi-transfer-right</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item :value="'tab-' + 'CLI to Ansible'">
              <v-card flat>
                <v-card-text class="pt-0 pl-0">
                  <v-textarea v-model="form.ansible" outlined auto-grow :hint="'CLI Configuration'"
                    :placeholder="'CLI Configuration'"></v-textarea>
                  <v-textarea v-model="form.specialRequest" outlined auto-grow :hint="'Special Request'"
                    :placeholder="'Special Request'" rows="1"></v-textarea>
                  <v-btn depressed block class="rounded-lg" :loading="loading.button.process"
                    @click="onButtonProcessClick()">
                    Generate Ansible Playbook <v-icon right>mdi-transfer-right</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <!-- ==== END TAB CONTENT ==== -->

        </v-col>
        <!-- ==== END FORM SECTION ==== -->


        <!-- **** RESULT SECTION **** -->
        <v-col cols="12" md="6" style="min-height: 94vh;">
          <v-row>
            <v-col cols="12" class="px-5 pt-0">
              <v-card flat>
                <v-card-text class="pt-0 pl-0 selectable-area">
                  <v-textarea ref="selectedText" outlined readonly auto-grow :value="result" class="grey lighten-4"
                    placeholder="Result..." hide-details>
                  </v-textarea>
                  <v-btn v-if="textSelection.text" :loading="loading.explanation" class="mt-3" color="grey" dark small
                    @click="onClickExplanation()"><v-icon small left>mdi-creation</v-icon>Explain selected text</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <!-- ==== END RESULT SECTION ==== -->

      </v-row>
    </v-container>


    <!-- Dialog Explanation -->

    <v-dialog v-model="dialogExplanation" persistent max-width="55vw">
      <v-card :loading="loading.explanation ? 'blue darken-4' : ''" >
        <v-card-title class="white--text primary text-h6 py-2">
          Explanation
          <v-spacer></v-spacer>
          <v-btn icon @click="onCloseDialogExplanation()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4" style="height: 450px; overflow-y: auto;">
          <pre class="wrapped-content">{{ explanation }}</pre>

          <div class="d-flex justify-center align-center text-center" v-if="loading.explanation" style="padding-top: 200px;">
          <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
        </div>
        </v-card-text>

      
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="onCloseDialogExplanation()">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- END Dialog Explanation -->


    <v-navigation-drawer v-model="drawer" right app>
      <v-list-item>
        <v-list-item-icon @click="drawer = false" style="cursor: pointer">
          <v-icon>mdi-close</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Explanation</v-list-item-title>
        </v-list-item-content>

      </v-list-item>

      <v-divider></v-divider>

      <!-- CONTENT EXPLANATION-->
      <v-card flat>
        <v-card-text v-text="explanation">

        </v-card-text>
        <div class="text-center" v-if="loading.explanation">
          <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
        </div>

      </v-card>
      <!-- END CONTENT EXPLANATION-->

    </v-navigation-drawer>

    <!-- POP UP  -->
    <v-snackbar v-model="snackbar.visible" timeout="1000">
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn :color="'primary'" text v-bind="attrs" @click="snackbar.visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <!-- END POP UP  -->
  </v-sheet>


</template>

<script>
// import { serialize} from 'object-to-formdata';
import { useTextSelection } from '@vueuse/core';
export default {
  data() {
    return {
      snackbar: {
        color: null,
        icon: null,
        mode: null,
        message: 'Copied to clipboard',
        timeout: 1000,
        title: null,
        visible: false,
      },
      drawer: false,
      dialogExplanation: false,
      selectedTab: 'IPv4 to IPv6',
      items: [
        'IPv4 to IPv6', 'CLI to Ansible'
      ],
      more: [],
      loading: {
        button: {
          process: false
        },
        explanation: false
      },
      explanation: null,
      result: undefined,
      form: {
        type: null,
        ipv4: null,
        ansible: null,
        ipv6block: null,
        selectedText: null,
        currentAnswer: null,
        specialRequest: null,
      },
      showTooltipInformation: false,
      textSelection: useTextSelection(),
    }
  },
  mounted() {
  },
  watch: {
    selectedTab(val) {
      switch (val) {
        case 'IPv4 to IPv6':
          this.form.ansible = null
          break;
        case 'CLI to Ansible':
          this.form.ipv6block = null
          break;

        default:
          break;
      }
    }
  },
  methods: {
    onClickExplanation() {
      this.dialogExplanation = true;
      this.explanation = '';
      this.retrieveExplanation()
    },
    retrieveExplanation() {
      this.loading.explanation = true;
      this.form.selectedText = this.textSelection.text;
      this.form.currentAnswer = this.result;
      this.axios
        .post('/explanation', this.form)
        .then((res) => {
          this.explanation = res;
        })
        .catch((err) => {
          this.loading.explanation = false;
          this.explanation = err;
        })
        .finally(() => {
          this.loading.explanation = false;
          this.textSelection = useTextSelection();
        });
    },
    onCloseDialogExplanation() {
      this.dialogExplanation = false;
    },
    onClickCopyButton() {
      navigator.clipboard.writeText(this.result);
      this.snackbar.visible = true;
    },
    onClickDeleteButton() {
      this.result = '';
    },
    onClickInformationIcon() {
      this.showTooltipInformation = !this.showTooltipInformation;
    },
    onButtonProcessClick() {
      this.explanation = '';
      this.form.type = this.selectedTab;
      this.loading.button.process = true;
      this.axios
        .post('/generate', this.form)
        .then((res) => {
          this.result = res;
        })
        .catch((err) => {
          this.loading.button.process = false;
          this.result = err;
        })
        .finally(() => {
          this.loading.button.process = false;
        });
    }
  }
};
</script>
<style>
.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right)>.v-slide-group--is-overflowing {
  display: none;
}

.selectable-area {
  user-select: text;
  /* Allow text selection within this area */
}

.selectable-area * {
  user-select: none;
  /* Prevent text selection for all child elements */
}

.selectable-area v-textarea {
  user-select: text;
  /* Allow text selection within the v-textarea */
}

.wrapped-content {
  width: 100%; /* Make the width follow the dialog's width */
  white-space: pre-wrap; /* Ensure text wraps instead of overflowing horizontally */
  word-wrap: break-word; /* Break long words to fit within the container */
}
</style>
