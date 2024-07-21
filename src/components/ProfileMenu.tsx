'use client'

import React from 'react'
import Link from 'next/link'

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";

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
	ArrowRightEndOnRectangleIcon,
	UserPlusIcon,
	CommandLineIcon,
} from "@heroicons/react/24/solid";

import { userRoleRankAdmin } from '@/lib/userRoleRank'


export default function ProfileMenu(props: { [key: string]: any; }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);

	const makeMenuItem = (label: string, icon: any, linkHref: string, isRed?: boolean) => (
		<MenuItem
			key={label}
			onClick={closeMenu}
			className={`p-0 ${
				isRed
					? "hover:bg-red-900/10 focus:bg-red-900/10 active:bg-red-900/10"
					: "hover:bg-black/10 focus:bg-black/10 active:bg-black/10"
			}`}
		>
			<Link href={linkHref} className={`rounded m-1 p-2 flex items-center gap-2`}>
				{React.createElement(icon, {
					className: `h-4 w-4 ${isRed ? "text-red-500" : ""}`,
					strokeWidth: 2,
				})}
				<Typography
					as="span"
					variant="small"
					className="font-normal"
					color={isRed ? "red" : "black"}
				>
					{label}
				</Typography>
			</Link>
		</MenuItem>
	)
 
	const menuItems = []

	if (props.sessionData.username != null)	{
		menuItems.push(makeMenuItem("My Profile", UserCircleIcon, "/myprofile"))
		menuItems.push(makeMenuItem("Edit Profile", Cog6ToothIcon, "/editprofile"))
		menuItems.push(makeMenuItem("Inbox", InboxArrowDownIcon, "/inbox"))
	} else {
		menuItems.push(makeMenuItem("Sign In", ArrowRightEndOnRectangleIcon, "/signin"))
		menuItems.push(makeMenuItem("Sign Up", UserPlusIcon, "/signup"))
	}
	menuItems.push(makeMenuItem("Help", LifebuoyIcon, "/help"))
	if (props.sessionData.userRoleRank >= userRoleRankAdmin) {
		menuItems.push(makeMenuItem("Admin Dashboard", CommandLineIcon, "/admin"))
	}
	if (props.sessionData.username != null)	{
		menuItems.push(makeMenuItem("Sign Out", PowerIcon, "/signout", true))
	}
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center justify-center align-center rounded-xl m-0 p-1 backdrop-blur-sm bg-gray-500/10 border border-black/20"
        >
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-6 w-6 text-black transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-6 w-6 text-black transition-transform ${
              !isMenuOpen ? "rotate-180" : ""
            }`}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-6 w-6 text-black transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-transparent backdrop-blur backdrop-saturate-1 bg-gray-500/10 border-black/20 shadow">
				{ menuItems }
     </MenuList>
    </Menu>
  );
}
 
