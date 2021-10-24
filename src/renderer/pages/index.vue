<template>
  <div>
    <div style="height:120px;" />
    <v-row>
      <v-col cols="12">
        <v-textarea v-model="originalText" label="original(alt + o)" accesskey="o" />
      </v-col>
      <v-col cols="12">{{ findRegExpText }}</v-col>
      <v-col cols="6">
        <v-text-field ref="findText" v-model="findText" error
                      hide-details="auto" :rules="findTextRules" label="find string(alt + f)" accesskey="f"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="replaceText" label="replace string(alt + r)" accesskey="r" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col v-for="(item,index) in list" :key="index" cols="12">
            <v-card v-if="item.value !== originalText" outlined @click="copyText(item.value)">
              <v-card-title>{{ item.name }}</v-card-title>
              <pre>{{ headStr(item.value) }}</pre>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { clipboard } from 'electron'

export default {
  data () {
    return {
      errors: [],
      findTextRules: [
        value => {
          return value !== this.findRegExpText ? '正規表現の片方の括弧を使用する場合は[]で囲ってください' : ''
        }
      ],
      findText: '',
      replaceText: '',
      originalText: '',
      resultText: ''
    }
  },
  computed: {
    resultSprit () {
      return this.originalText.split('[¥r¥n]')
    },
    normal () {
      return this.resultSprit.map(line => {
        return line.split(this.findText).join(this.replaceText)
      }).join('¥n')
    },
    regExpText () {
      const reg = this.findRegExpText
      return this.resultSprit.map(line => {
        return line.replace(reg, this.replaceText)
      }).join('¥n')
    },
    findRegExpText () {
      let value = ''
      try {
        value = new RegExp(this.findText, 'g')
      } catch (e) {
      }
      return value
    },
    list () {
      const list = []
      list.push({ name: '通常', value: this.normal })
      list.push({ name: '正規表現', value: this.regExpText })
      return list
    }
  },
  methods: {
    headStr (value) {
      const limit = 100
      if (value.length >= limit) {
        return value.substring(0, limit) + '...'
      }
      return value
    },
    copyText (value) {
      clipboard.writeText(value)
    }
  }
}
</script>

<style></style>
