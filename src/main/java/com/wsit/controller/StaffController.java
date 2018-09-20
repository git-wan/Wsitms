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

import com.wsit.service.StaffService;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;
@RequestMapping("/staff")
@Controller
public class StaffController extends BaseController{
	
	@Resource
	StaffService staffService;
	
	@RequestMapping(value="/load",method=RequestMethod.GET)
	@ResponseBody
	public Object  load(){
		PageData pd =this.getPageData();
        String id =pd.getString("id");
		try {
			if(Tools.notEmpty(id)){
				return staffService.staffOne(id);
			}
			return staffService.staffPage(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	
/*	@RequestMapping(value="/departList",method=RequestMethod.GET)
	@ResponseBody
	public Object  departList(){

		try {
			return departService.departList();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}*/
	

	
	
	@RequestMapping(value="/addStaff" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addStaff(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			staffService.addStaff(pd);
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
	
	@RequestMapping(value="modStaff",method=RequestMethod.POST)
	@ResponseBody
	public Object  modStaff(){
		PageData pd  =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
	
			staffService.modStaff(pd);
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

	@RequestMapping(value = "/batchDelStaff",method = RequestMethod.POST)
	@ResponseBody	
	public Object batchDelStaff(HttpServletRequest request){
		PageData pd  =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
        String[] arrayIds=pd.getString("idList").split(",");
        List<String> ids = Arrays.asList(arrayIds);
		try{
			staffService.batchDelStaff(ids);
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
