package com.wsit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.utils.PageData;
@RequestMapping("/group")
@Controller
public class GroupController extends BaseController{

	
	@RequestMapping(value="/groupList",method=RequestMethod.GET)
	@ResponseBody
	public Object groupList(PageData pd){
		return  null;
	}
	
	@RequestMapping(value="/addGroup",method=RequestMethod.POST)
	@ResponseBody
	public Object addGroup(){
		return null;
	}
	
	@RequestMapping(value="/modGroup",method=RequestMethod.POST)
	@ResponseBody
	public Object modGroup(){
		return null;
	}
}
