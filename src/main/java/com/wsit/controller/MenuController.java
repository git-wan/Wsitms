package com.wsit.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.MenuService;
import com.wsit.utils.PageData;

import net.sf.json.JSONArray;
@RequestMapping("menu")
@Controller
public class MenuController extends BaseController{
	@Resource
	MenuService menuService;
	
	@RequestMapping("/getMenuList")
	@ResponseBody
	public Object  getMenu(HttpServletRequest request) throws Exception{
		PageData pd= (PageData) request.getSession().getAttribute("user");
		
		PageData group_menus= menuService.getMenuList(pd);	
		return group_menus;		
	}
	
	
	
	@RequestMapping(value="/roleMenu",method=RequestMethod.GET)
	@ResponseBody
	public Object  roleMenu(){
		PageData pd =this.getPageData();
		try {
			return menuService.roleMenu(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
		
	
	@RequestMapping(value="/userMenu",method=RequestMethod.GET)
	@ResponseBody
	public Object  userMenu(){
		PageData pd =this.getPageData();
		try {
			return menuService.userMenu(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/roleNoMenu",method=RequestMethod.GET)
	@ResponseBody
	public Object  roleNoMenu(){
		PageData pd =this.getPageData();
		try {
			return menuService.roleNoMenu(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value="/userNoMenu",method=RequestMethod.GET)
	@ResponseBody
	public Object  userNoMenu(){
		PageData pd =this.getPageData();
		try {
			return menuService.userNoMenu(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/setRoleAuth",method=RequestMethod.POST)
	@ResponseBody
	public Object  setRoleAuth(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		System.out.println(pd);		  
		try {
			Boolean success= menuService.setRoleAuth(pd);
			map.put("success", success);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
		}
		return map;
	}
	
	
	@RequestMapping(value="/setUserAuth",method=RequestMethod.POST)
	@ResponseBody
	public Object  setUserAuth(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();	 
		System.out.println(pd);	
		try {
			Boolean success= menuService.setUserAuth(pd);
			map.put("success", success);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
		}
		return map;
	}
}
