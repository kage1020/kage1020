import type { NextPage } from 'next'
import Head from 'next/head'
import { SiGithub, SiTwitter, SiQiita, SiZenn } from 'react-icons/si';
import { RiSearchLine } from 'react-icons/ri';
import { Box } from '../components/box';
import { Ball, ExpandBall } from '../components/ball';
import React, { useState , useEffect} from 'react';
import useRepo from '../libs/redux/useRepo';
import clsx from 'clsx';
import { useRef } from 'react';
import { BaseTag, GCalendarTag, JQueryTag, LINETag, NextTag, ReduxTag, TailwindTag, TypescriptTag } from '../components/tag';
import Image from 'next/image';
import { Dialog } from '../components/dialog';
import { TbSun, TbMoon } from 'react-icons/tb';

const leftBalls = [
  {
    icon: SiZenn,
    text: 'Zenn',
    href: 'https://zenn.dev/kage1020',
  },
  {
    icon: SiQiita,
    text: 'Qiita',
    href: 'https://qiita.com/kage1020'
  },
  {
    icon: SiTwitter,
    text: 'Twitter',
    href: 'https://twitter.com/kage1020'
  },
  {
    icon: SiGithub,
    text: 'GitHub',
    href: 'https://github.com/kage1020'
  }
]

const rightBoxes = [
  // {
  //   id: 'HomeCareLink',
  //   text: 'HomeCareLink'
  // },
  {
    id: 'FamilySchedule',
    text: 'Family Schedule'
  },
  {
    id: 'StockDataSupplier',
    text: 'Stock Data Supplier'
  },
  {
    id: 'TrafficLtd',
    text: 'Traffic Ltd.'
  },
]

export const ids = rightBoxes.map(box => box.id)

const Home: NextPage = () => {
  const [repo, setRepo] = useRepo();
  const [ready, setReady] = useState(false);
  const [isDark, setDark] = useState(true);

  const onClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setRepo(-1)
  }

  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, 5000)
  })

  return (
    <div className={isDark ? 'dark' : ''}>
      <Head>
        <title>Portfolio of kage1020</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta name="description" content="Portfolio of kage1020" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <meta name="theme-color" content="#00B4D8" />
        <meta property='og:title' content='Portfolio of kage1020' />
        <meta property='og:description' content='improvement of QOL' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='/' />
        <meta property='og:image' content='/icon.svg' />
        <meta property='og:site_name' content='Portfolio of kage1020' />
        <meta property='og:locale' content='ja_JP' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@kage1020' />
        <meta name='twitter:title' content='Portfolio of kage1020' />
        <meta name='twitter:description' content='improvement of QOL' />
        <meta name='twitter:image' content='/icon.svg' />
      </Head>

      <div
        className='w-screen h-screen font-noto relative bg-slate-200 dark:bg-slate-900'
        onClick={onClickOutside}
      >
        {/* search box */}
        <div className='w-full'>
          <div className='flex justify-center items-center p-12'>
            <div className='bg-white/70 border-2 text-black text-2xl rounded-2xl px-4 pt-2 pb-3 min-w-[24rem] flex justify-between items-center'>
              <span className='w-full'>
                <span
                  className='inline-block border-r-2 border-black pr-1 w-[18ch] whitespace-nowrap overflow-hidden font-roboto animate-typewriter'
                >
                  Improvement of QOL
                </span>
              </span>
              <span><RiSearchLine /></span>
            </div>
          </div>
        </div>
        {/* list item */}
        <div className='flex justify-center w-full'>
          <div className='absolute left-1/4 flex justify-center'>
            <div className='flex flex-col-reverse justify-center relative'>
              {leftBalls.map((box, index) => (
                <a href={box.href} target='_blank' rel='noopener noreferrer' title={box.text} key={index}>
                  <ExpandBall key={index} className='my-2 overflow-hidden group hover:space-x-4 hover:px-4'>
                    <box.icon />
                    <span className='sr-only group-hover:not-sr-only cursor-pointer'>{box.text}</span>
                  </ExpandBall>
                </a>
              ))}
            </div>
          </div>
          <div
            className={clsx(
              'flex flex-col-reverse items-center justify-center m-16 transition duration-500 relative',
              repo !== -1 && 'translate-x-[24rem]',
              ready ? 'opacity-100' : 'opacity-0'
            )}
          >
            {rightBoxes.map((box, index) => (
              <Box
                key={index}
                index={index}
                id={box.id}
              >
                <span>{box.text}</span>
              </Box>
            ))}
            <Dialog
              open={repo === 0}
              title='Family Schedule'
              className='w-96 bg-white/70 min-h-[16rem] grid items-center p-4'
            >
              <div className='flex flex-wrap gap-2 my-2'>
                <BaseTag><span>GAS</span></BaseTag>
                <JQueryTag />
                <GCalendarTag />
                <LINETag />
              </div>
              <p>家族の予定をLINE上で管理するアプリです．LINEの通知機能で毎朝当日の予定をお届け！現在は私の家族専用ですが，いずれ「Group Scheduler」として一般向けにリリース予定！</p>
              <p className='text-center mt-2'>
                <a href='https://github.com/kage1020/FamilySchedule' target='_blank' rel='noopener noreferrer' className='underline outline-none'>repository</a>
              </p>
            </Dialog>
            <Dialog
              open={repo === 1}
              title='Stock Data Supplier'
              className='w-96 bg-white/70 min-h-[16rem] grid items-center p-4'>
              <div className='flex flex-wrap gap-2 my-2'>
                <BaseTag><span>GAS</span></BaseTag>
                <JQueryTag />
                <LINETag />
              </div>
              <p>株式の銘柄探索サイト「株探」から各銘柄の必要な情報を抽出し，重要な指標や数値を計算してまとめて表示するLINE用アプリです．</p>
              <p className='text-center mt-2 flex items-center justify-center'>
                <Image src='/qr.png' width={150} height={150} alt='qrcode of LINE Account' />
                <div className='pl-2'>
                  <a href='https://sites.google.com/view/stockdatasupplier/stock-data-search' target='_blank' rel='noopener noreferrer' className='block text-sky-500 underline outline-none'>ブラウザでも開けます</a>
                  <a href='https://github.com/kage1020/StockDataSupplier' target='_blank' rel='noopener noreferrer' className='block underline outline-none'>repository</a>
                </div>
              </p>
            </Dialog>
            <Dialog
              open={repo === 2}
              title='Traffic Ltd.'
              className='w-96 bg-white/70 min-h-[16rem] grid items-center p-4'>
              <div className='flex flex-wrap gap-2 my-2'>
                <NextTag />
                <TailwindTag />
                <TypescriptTag />
                <ReduxTag />
              </div>
              <p>日本の公共交通機関を舞台にした経営戦略シミュレーションゲーム．時々刻々と増える客を効率よく輸送し，全国展開する黒字企業を育てよう！</p>
              <p className='text-center mt-2 inline-flex justify-between w-full'>
                <a href='https://traffic-ltd.vercel.app/' target='_blank' rel='noopener noreferrer' className='text-sky-500 underline outline-none'>Play Start!</a>
                <a href='https://github.com/kage1020/TrafficLtd' target='_blank' rel='noopener noreferrer' className='underline outline-none'>repository</a>
              </p>
            </Dialog>
          </div>
        </div>
        {/* references */}
        <div className='group'>
          <Ball className='absolute bottom-16 left-16 z-50 hover:to-sky-800 hover:from-sky-400 hover:text-white dark:hover:to-sky-600 dark:hover:from-sky-300'>Refs</Ball>
          <a
            href='https://www.youtube.com/watch?v=c2pbcpZJrTs'
            target='_blank'
            rel='noopenner noreferrer'
            className='absolute bottom-16 left-16 transition duration-500 group-hover:-translate-y-[6rem]'
          >
            <Ball className='text-lg hover:to-sky-800 hover:from-sky-400 hover:text-white dark:hover:to-sky-600 dark:hover:from-sky-300'>box</Ball>
          </a>
          <a
            href='https://hapicode.com/css/typing-animation.html'
            target='_blank'
            rel='noopenner noreferrer'
            className='absolute bottom-16 left-16 transition duration-500 group-hover:translate-x-[6rem]'
          >
            <Ball className='text-base px-2 hover:to-sky-800 hover:from-sky-400 hover:text-white dark:hover:to-sky-600 dark:hover:from-sky-300 break-all'>type writer</Ball>
          </a>
        </div>
        {/* toggle dark mode */}
        <div className='absolute bottom-16 right-16 cursor-pointer' onClick={() => setDark(!isDark)}>
          <Ball>
            {isDark && <TbMoon size={35} />}
            {!isDark && <TbSun size={35} />}
          </Ball>
        </div>
      </div>
    </div>
  )
}

export default Home
