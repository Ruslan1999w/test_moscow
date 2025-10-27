<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-modal-provider>
            <n-dialog-provider>

              <div style="padding: 12px; text-align: right">
                <n-button size="small" @click="toggleLanguage">
                  {{ currentLang === 'en' ? 'RU' : 'EN' }}
                </n-button>
              </div>

              <Table />

            </n-dialog-provider>
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NModalProvider,
  NDialogProvider,
  NButton,
  enUS,
  dateEnUS,
  ruRU,
  dateRuRU
} from 'naive-ui'
import Table from './components/Table/Table.vue'

const LANG_STORAGE_KEY = 'user-language'

const languages = {
  en: { locale: enUS, dateLocale: dateEnUS },
  ru: { locale: ruRU, dateLocale: dateRuRU }
}

const currentLang = ref('ru')
const locale = ref(ruRU)
const dateLocale = ref(dateRuRU)

onMounted(() => {
  const saved = localStorage.getItem(LANG_STORAGE_KEY)
  if (saved === 'en' || saved === 'ru') {
    currentLang.value = saved
  } else {
    const userLang = navigator.language
    if (userLang.startsWith('en')) {
      currentLang.value = 'en'
    } else if (userLang.startsWith('ru')) {
      currentLang.value = 'ru'
    }
  }

  const langConfig = languages[currentLang.value]
  locale.value = langConfig.locale
  dateLocale.value = langConfig.dateLocale
})

function toggleLanguage() {
  const newLang = currentLang.value === 'en' ? 'ru' : 'en'
  currentLang.value = newLang

  const langConfig = languages[newLang]
  locale.value = langConfig.locale
  dateLocale.value = langConfig.dateLocale

  localStorage.setItem(LANG_STORAGE_KEY, newLang)
}
</script>
