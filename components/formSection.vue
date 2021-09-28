
<v-alert
        dense
        text
        type="success"
        :value="alertPost"
        style="position: fixed; z-index: 1; right: 200px; bottom: 100px"
        >プロジェクトの様子を投稿しました</v-alert
      >

      <v-row justify="center" v-if="loggedIn">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="position: fixed; z-index: 1; right: 20%; bottom: 5%"
              fab
              large
              color="cyan darken-1"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">プロジェクトの様子を投稿する</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <label class="postImage-appendBtn"></label>
                <input
                  type="file"
                  id="btnUpload"
                  @change="btnUploadChange"
                  value="アップロード"
                  data-label="画像の添付"
                /><br />
                <v-img :src="image" width="100" height="100"></v-img>
                <label>ゴミの量</label>
                <v-col cols="3">
                  <v-select :items="items" label="kg" solo>kg</v-select>
                </v-col>
                <label>日時</label>
                <v-text-field v-model="date" class="white" placeholder="">{{
                  date
                }}</v-text-field>
                <label>コメント</label>
                <v-textarea
                  solo
                  v-model="comment"
                  class="white"
                  placeholder="例) 今日もたくさん拾いました。"
                ></v-textarea>
                <label>場所</label>
                <div class="map_section">
                  <section
                    class="ui two column centered grid"
                    style="position: relative; z-index: 1"
                  >
                    <div class="column">
                      <form class="ui segment large form">
                        <div class="ui message red" v-show="error">
                          {{ error }}
                        </div>
                        <div class="ui segment">
                          <div class="field">
                            <div
                              class="ui right icon input large"
                              :class="{ loading: spinner }"
                            >
                              <input
                                type="text"
                                placeholder="Enter your address"
                                v-model="address"
                                id="autocomplete"
                              />
                              <i
                                class="dot circle link icon"
                                @click="locatorButtonPressed"
                              ></i>
                            </div>
                          </div>
                          <!-- <button class="ui button">Go</button> -->
                        </div>
                      </form>
                    </div>
                  </section>
                  <section id="map"></section>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                閉じる
              </v-btn>
              <v-btn
                @click="addMessage"
                class="ma-3 float-right font-weight-bold"
                color="cyan"
                dark
                >投稿</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>