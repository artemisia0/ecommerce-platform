'use client'

import {
	Navbar,
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	Card,
	IconButton,
} from '@/lib/material-ui'

import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";

import ProfileMenu from '@/components/ProfileMenu'
import { isDrawerOpenAtom } from '@/lib/drawerState'
import { useAtom } from 'jotai'


function ClickIcon() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
</svg>
	)
}


export default function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useAtom(isDrawerOpenAtom)

	const titleButtonCallback = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setIsDrawerOpen(!isDrawerOpen)
	}

	return (
		<header className="flex justify-center items-center w-full">
			<Navbar className="w-full max-w-[960px] backdrop-saturate-1 backdrop-blur bg-transparent border-none flex justify-between flex-row items-center align-center p-2 rounded-none shadow">
				<div className="flex gap-1 text-black items-center hover:text-blue-900">
					<button onClick={titleButtonCallback} className="text-black cursor-pointer text-xl p-1 hover:text-black backdrop-blur-sm rounded-lg">
						eCommerce Platform
					</button>
					<ClickIcon></ClickIcon>
				</div>
				<ProfileMenu></ProfileMenu>
			</Navbar>
		</header>
	)
}

