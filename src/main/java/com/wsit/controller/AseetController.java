package com.wsit.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.wsit.service.AseetService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.ObjectExcelView;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;
import com.wsit.utils.UuidUtil;
@RequestMapping("/aseet")
@Controller
public class AseetController extends BaseController {

	@Resource
	AseetService aseetService;
	
	@RequestMapping(value="/load",method=RequestMethod.GET)
	@ResponseBody
	public Object  load(){
		PageData pd =this.getPageData();
        String id =pd.getString("id");
		try {
			if(Tools.notEmpty(id)){
				return aseetService.aseetOne(id);
			}
			return aseetService.aseetPage(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value="/serverList",method=RequestMethod.GET)
	@ResponseBody
	public Object  serverList(){
		PageData pd =this.getPageData();
        String id =pd.getString("id");
		try {
			if(Tools.notEmpty(id)){
				return aseetService.serverOne(id);
			}
			return aseetService.serverList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/addServer" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addServer(){
		PageData pd =this.getPageData();
		pd.put("SERVER_ID", UuidUtil.get32UUID());
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			aseetService.addServer(pd);
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
	
	@RequestMapping(value="/delServer" ,method=RequestMethod.POST)
	@ResponseBody
	public Object delServer(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			aseetService.delServer(pd);
		} catch (Exception e) {		
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据删除出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据删除成功");
		return map;		
	}
	
	@RequestMapping(value="/modServer" ,method=RequestMethod.POST)
	@ResponseBody
	public Object modServer(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			aseetService.modServer(pd);
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
	
	
	@RequestMapping(value="/querySer",method=RequestMethod.GET)
	@ResponseBody
	public Object  querySer(){
		PageData pd =this.getPageData();
		try {
			return aseetService.querySer(pd);
		} catch (Exception e) {

			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping("/excel")
	public ModelAndView exportExcel() throws Exception {
		ModelAndView mv = this.getModelAndView();
		PageData pd = this.getPageData();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		List<String> titles = new ArrayList<String>();
		titles.add("机柜");
		titles.add("应用系统");
		titles.add("品牌型号");
		titles.add("IP");
		titles.add("操作系统");
		titles.add("备注");
		dataMap.put("titles", titles);
		List<PageData> serverList = aseetService.serverList();
		List<PageData> varList = new ArrayList<PageData>();
		for (int i = 0; i < serverList.size(); i++) {
			PageData vpd = new PageData();
			vpd.put("var1", serverList.get(i).get("CABINET") + ""); // 1
			vpd.put("var2", serverList.get(i).get("APPLICATION") + ""); // 2
			vpd.put("var3", serverList.get(i).get("BRAND") + ""); // 3
			vpd.put("var4", serverList.get(i).get("IP") + ""); // 4
			vpd.put("var5", serverList.get(i).get("SYS") + ""); // 5
			vpd.put("var6", serverList.get(i).get("NOTE") + ""); // 6
			varList.add(vpd);
			dataMap.put("varList", varList);
			dataMap.put("SALEDATE", new Date());
			dataMap.put("name", "服务器清单");
			ObjectExcelView erv = new ObjectExcelView(); // 执行excel操作
			mv = new ModelAndView(erv, dataMap);
		}
		return mv;
	}
}
