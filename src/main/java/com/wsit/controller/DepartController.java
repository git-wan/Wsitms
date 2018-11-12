package com.wsit.controller;

import java.util.Arrays;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import com.wsit.service.DepartService;

import com.wsit.utils.PageData;
import com.wsit.utils.Tools;
@RequestMapping("/depart")
@Controller
public class DepartController extends BaseController{

	@Resource
	DepartService departService;
	
	
	@RequestMapping(value="/load",method=RequestMethod.GET)
	@ResponseBody
	public Object  load(){
		PageData pd =this.getPageData();
        String id =pd.getString("id");
		try {
			if(Tools.notEmpty(id)){
				return departService.departOne(id);
			}
			return departService.departPage(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value="/departList",method=RequestMethod.GET)
	@ResponseBody
	public Object  departList(){

		try {
			return departService.departList();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/company",method=RequestMethod.GET)
	@ResponseBody
	public Object  company(){

		try {
			return departService.company();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value="/addDepart" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addDepart(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			departService.addDepart(pd);
		} catch (Exception e) {		
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据添加成功");
		return map;		
	}
	
	@RequestMapping(value="modDepart",method=RequestMethod.POST)
	@ResponseBody
	public Object  modUser(){
		PageData pd  =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
	
			departService.modDepart(pd);
		} catch (Exception e) {		
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据修改成功");
		return map;	
	}  

	@RequestMapping(value = "/batchDelDepart",method = RequestMethod.POST)
	@ResponseBody	
	public Object batchDelDepart(HttpServletRequest request){
		PageData pd  =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
        String[] arrayIds=pd.getString("idList").split(",");
        List<String> ids = Arrays.asList(arrayIds);
		try{
			departService.batchDelDepart(ids);
		}catch(Exception e){
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;			
		}
		map.put("success", true);
		map.put("msg", "数据删除成功");
		return map;	
		
	}	
}
