import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我",
  description:
    "認識 Glow Edit 的站長——一個熱愛醫美和韓國美妝的都會女子，分享最真實的產品體驗。",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-text mb-6">
        關於 Glow Edit
      </h1>

      {/* Brand Story */}
      <section className="prose prose-lg max-w-none">
        <p className="text-lg text-text-light leading-relaxed">
          嗨！歡迎來到 Glow Edit。我是這個網站的站長，一個住在台北、熱愛研究保養品和醫美的上班族。
        </p>

        <h2 className="font-serif">為什麼創辦 Glow Edit？</h2>
        <p>
          故事要從兩年前說起。那時我第一次做了 Ulthera 音波拉提，術後面對一片空白的保養資訊，心裡充滿焦慮——到底該用什麼產品？哪些成分要避免？網路上的資訊參差不齊，不是廣告就是過時的內容。
        </p>
        <p>
          後來，我開始自己研究、試用各種術後修護產品，從韓國的 Aestura、COSRX 到日本的藥妝，一路試到找到最適合自己的組合。這個過程讓我發現，很多跟我一樣的輕醫美族群，都在面臨同樣的問題。
        </p>
        <p>
          Glow Edit 就是在這樣的背景下誕生的——我想建立一個<strong>值得信賴的資訊平台</strong>，用最真實的親身體驗，幫助你找到適合自己的術後保養方案。
        </p>

        <h2 className="font-serif">我的醫美經歷</h2>
        <ul>
          <li>Ulthera 美國極線音波拉提</li>
          <li>ONDA 酷塑波體雕</li>
          <li>皮秒雷射（多次）</li>
          <li>水光針 / Skin Booster</li>
          <li>肉毒桿菌素微整</li>
        </ul>
        <p>
          每一個療程的術後保養，我都有詳細的紀錄和產品評測。這些經驗讓我能夠提供最實際的建議。
        </p>

        <h2 className="font-serif">評測方法論</h2>
        <p>
          Glow Edit 的每一篇評測都遵循以下原則：
        </p>
      </section>

      {/* Methodology Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        {[
          {
            title: "親身使用",
            desc: "每款產品至少使用 2 週以上，才會撰寫評測。不接受未使用的產品推薦。",
          },
          {
            title: "成分分析",
            desc: "參考 CosDNA、INCI Decoder 等工具進行成分分析，確保資訊正確。",
          },
          {
            title: "透明揭露",
            desc: "所有分潤連結都會明確標示。評測結果不受合作關係影響。",
          },
          {
            title: "持續更新",
            desc: "隨著使用時間增加，會更新評測內容。長期使用的心得比初次印象更可靠。",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl p-5 border border-primary-light/20"
          >
            <h3 className="font-serif text-base font-semibold text-text mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-text-light leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Trust Data */}
      <section className="bg-white rounded-2xl p-8 mt-10">
        <h2 className="font-serif text-xl font-semibold text-text mb-6 text-center">
          數據說話
        </h2>
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { number: "2+", label: "年醫美經驗" },
            { number: "50+", label: "產品親測" },
            { number: "100%", label: "真實體驗" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-accent">
                {stat.number}
              </div>
              <div className="text-sm text-text-light mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-10 text-center">
        <p className="text-text-light">
          有任何問題或合作邀約，歡迎來信：
          <br />
          <a
            href="mailto:hello@glowedit.com"
            className="text-accent hover:text-accent-dark font-medium"
          >
            hello@glowedit.com
          </a>
        </p>
      </section>
    </div>
  );
}
