import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function HeroPc() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-16 pb-16 px-4">
      <h1 className="font-extrabold text-center drop-shadow-lg mb-10 tracking-tight text-white">
        <span className="text-white font-extrabold tracking-wide block text-9xl">
          ビートに没入する時間
        </span>
      </h1>
      <div className="w-full flex justify-center">
        <div
          style={{
            width: '100%',
            backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}assets/noisegradient.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            borderRadius: '1.5rem',
            padding: '8px',
            boxShadow: '0 10px 32px 0 rgba(0,0,0,0.25)',
          }}
          className="w-full max-w-[1700px] mx-auto flex flex-col items-center justify-center py-12 relative overflow-hidden"
        >
          <p className="text-xl md:text-xl text-center text-white max-w-5xl mb-6 mx-auto leading-relaxed font-[500] tracking-wide antialiased drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
            Droptuneなら、サクッとできた音楽のループがそのまま作品になります。
            <br />
            短くてもずっと聞いていたくなる、気持ちいいフレーズを投稿してリスナーを楽しませましょう！
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              href="/"
              className="px-10 py-4 bg-white text-[#121317] font-bold rounded-full text-xl shadow-lg border border-white hover:bg-gray-100 transition h-14 flex items-center justify-center"
            >
              はじめる
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 bg-transparent text-white font-medium rounded-full text-xl border-2 border-white hover:bg-white/10 transition h-14 flex items-center justify-center"
            >
              ログイン
            </Link>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}assets/lpmainimg.webp`}
            alt="Droptune LPメインイメージ"
            width={1600}
            height={600}
            className="rounded-2xl object-contain w-full h-auto z-10 relative px-4 sm:px-12 max-w-[1280px]"
            priority
          />
        </div>
      </div>
    </section>
  )
}

function HeroSp() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-10 pb-0 px-0">
      <h1 className="text-6xl font-bold text-center text-white mb-10">
        ビートに
        <br />
        没入する時間
      </h1>
      <div
        className="py-10 flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}assets/noisegradient_sp.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          padding: '0px',
          boxShadow: '0 10px 32px 0 rgba(0,0,0,0.25)',
        }}
      >
        <p className="text-base text-center text-white mb-8 px-4 font-[500] tracking-wide antialiased leading-tight">
          Droptuneなら、サクッとできた音楽のループがそのまま作品になります。
          短くてもずっと聞いていたくなる、気持ちいいフレーズを投稿してリスナーを楽しませましょう！
        </p>
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}assets/lpmainimg_sp.webp`}
          alt="Droptune SPイメージ"
          width={400}
          height={200}
          className="rounded-xl w-full h-auto px-0"
          priority
        />
        <div className="flex gap-3 mt-8 px-4">
          <Link
            href="/"
            className="px-6 py-3 bg-white text-[#121317] font-bold rounded-full text-md shadow border border-white hover:bg-gray-100 transition"
          >
            はじめる
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-transparent text-white font-medium rounded-full text-md border-2 border-white hover:bg-white/10 transition"
          >
            ログイン
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  const [isSp, setIsSp] = useState(false)
  useEffect(() => {
    const onResize = () => setIsSp(window.innerWidth < 600)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <Head>
        <title>About Droptune</title>
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}assets/noisegradient.webp`}
          as="image"
        />
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}assets/lpmainimg.webp`}
          as="image"
        />
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}assets/lpmainimg_sp.webp`}
          as="image"
        />
      </Head>
      <div className="navbar bg-baseNav border-b border-stone-800">
        <div className="max-w-xl mx-auto w-full ">
          <div className="navbar-start"></div>
          <div className="navbar-center">
            <Link href="/">
              <img src="/logomark_type.svg" alt="Droptune" width="160" />
            </Link>
          </div>
          <div className="navbar-end flex"></div>
        </div>
      </div>
      <div className="w-full min-h-screen bg-[#121317]">
        {/* ヒーローセクション */}
        {isSp ? <HeroSp /> : <HeroPc />}

        {/* 特徴セクション */}
        {/* <section className="w-full py-16 px-4 bg-[#181a20]">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            主な特徴
          </h2>
          <div className="w-full flex justify-center min-h-[400px]">
            （準備中）
          </div>
          {/*<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#23242a] rounded-2xl p-8 shadow-lg border border-blue-900/30 flex flex-col items-center">
              <span className="text-4xl mb-4">🤖</span>
              <h3 className="text-xl font-semibold text-emerald-300 mb-2">
                AIコード補完
              </h3>
              <p className="text-gray-300 text-center">
                AIによるコード補完と自動修正で、コーディングが圧倒的にスムーズに。
              </p>
            </div>
            <div className="bg-[#23242a] rounded-2xl p-8 shadow-lg border border-blue-900/30 flex flex-col items-center">
              <span className="text-4xl mb-4">💬</span>
              <h3 className="text-xl font-semibold text-blue-300 mb-2">
                自然言語編集
              </h3>
              <p className="text-gray-300 text-center">
                自然言語でクラスや関数を編集。AIが意図を理解してコードを生成。
              </p>
            </div>
            <div className="bg-[#23242a] rounded-2xl p-8 shadow-lg border border-blue-900/30 flex flex-col items-center">
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                全体検索
              </h3>
              <p className="text-gray-300 text-center">
                コードベース全体をAIが理解し、瞬時に検索・参照が可能。
              </p>
            </div>
          </div>
          
        </section>*/}

        {/* イメージセクション */}
        <section className="w-full sm:py-16 py-10 px-4 flex flex-col items-center bg-[#181a20]  ">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
            開発者より
          </h2>
          <div className="w-full flex flex-col justify-center min-h-[400px] max-w-2xl mx-auto gap-2 text-lg  bg-backgroundGray border border-stone-800  mb-4 rounded-lg sm:px-12 sm:py-12 px-4 py-8 font-light antialiased text-white">
            <p className="mb-6 font-bold">
              音楽を作っていると、「これだ！」と感じるフレーズに出会える瞬間があります。
            </p>

            <div className="w-full flex justify-center mb-8">
              <Image
                src="/lp_from_developer01.webp"
                alt="開発者からのメッセージ"
                width={800}
                height={450}
                className="rounded-lg max-w-full h-auto sm:max-w-[70%]"
                priority
              />
            </div>

            <p className="mb-6">
              求めていた音にたどり着いたと同時に、まったく新しい何かに出会ったような不思議な感覚です。
              決して頻繁にあるわけではないけれど、その感覚を求めて日々試行錯誤を続けています。
            </p>

            <p className="mb-6">
              <span className="font-bold">
                そんな断片こそ、多くの人に気軽に聴いてもらえたら。
              </span>
              <br />
              もっと自由で楽しい音楽体験が広がると思い、このサービスを作りました。
            </p>

            <div className="w-full flex justify-center mb-8">
              <Image
                src="/lp_from_developer02.webp"
                alt="開発者からのメッセージ"
                width={800}
                height={450}
                className="rounded-lg max-w-full h-auto sm:max-w-[70%]"
                priority
              />
            </div>

            <p className="mb-6">
              もちろん、音楽はループだけで完結しません。
              ブレイクやドロップの構造、計算された抑揚によって感情が動く。その展開の美しさこそが本質です。
            </p>

            <p className="mb-6">
              でも、短時間コンテンツが当たり前になった今、音楽の入り口として「フレーズそのものの快楽」にフォーカスするのも、ひとつの形だと思っています。
            </p>

            <p className="mb-6">
              <span className="text-4xl flex justify-center">🥁 🎹 🎸</span>
            </p>

            <p className="">
              <span className="font-bold">
                Droptuneが、あなたのひらめきをシェアする場所になれば。
                そして、それが誰かの心を動かすきっかけになれば。
              </span>
              <br />
              そう願っています。
            </p>
          </div>
        </section>

        {/* CTAセクション */}
        <section
          className="w-full py-20 px-4 flex flex-col items-center"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}assets/noisegradient.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
            今すぐ体験しよう
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-10 py-4 bg-white text-[#121317] font-bold rounded-full text-xl shadow-lg border border-white hover:bg-gray-100 transition h-14 flex items-center justify-center"
            >
              はじめる
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 bg-transparent text-white font-medium rounded-full text-xl border-2 border-white hover:bg-white/10 transition h-14 flex items-center justify-center"
            >
              ログイン
            </Link>
          </div>
        </section>
      </div>
      <footer className="w-full text-center text-xs text-gray-600 opacity-100 py-6 select-none bg-[#181A1F]">
        droptune all rights reserved
      </footer>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    // 全体のページをビルド時に生成することで初期表示を高速化
  }
}
