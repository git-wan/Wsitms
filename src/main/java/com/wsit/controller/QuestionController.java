package com.wsit.controller;

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

import com.wsit.service.QuestService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;


@RequestMapping("/question")
@Controller
public class QuestionController extends BaseController{
	
	@Resource
	QuestService questService;
	
	@RequestMapping(value="/load",method=RequestMethod.GET)
	@ResponseBody
	public Object load(){
		PageData pd = this.getPageData();
		try {
			return questService.questList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value="/overProblem",method=RequestMethod.GET)
	@ResponseBody
	public Object overProblem(){
		PageData pd = this.getPageData();
		String STRATDATE = pd.get("STRATDATE").toString();
		String ENDDATE = pd.get("ENDDATE").toString();
		if(Tools.notEmpty(STRATDATE)){
			Date sdate =DateUtil.fomatDate(STRATDATE);
			pd.put("STRATDATE", sdate);
		}		
        if(Tools.notEmpty(ENDDATE)){
        	Date tdate=DateUtil.fomatDate(ENDDATE);
        	pd.put("ENDDATE", tdate);
		}		
		try {			
			return questService.overProblem(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/backDetail",method=RequestMethod.GET)
	@ResponseBody
	public Object backDetail(){
		PageData pd = this.getPageData();	
		try {			
			return questService.backDetail(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/addQuest" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addQuest(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		String DATE_ = pd.get("DATE_").toString();
		if(Tools.notEmpty(DATE_)){
			Date tdate=DateUtil.fomatDate(DATE_);
			pd.put("DATE_", tdate);
		}
		pd.put("INDATE", new Date());
		try {
			questService.addQuest(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据添加成功");
		return map;		
	}
	
	@RequestMapping(value="/addOpTemp" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addOpTemp(){
		PageData pd =this.getPageData();
		System.out.println(pd);
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			questService.addOpTemp(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据添加成功");
		return map;		
	}
	
	
	@RequestMapping(value="/problemBack" ,method=RequestMethod.POST)
	@ResponseBody
	public Object problemBack(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		if(Tools.notEmpty(pd.get("ANSWERDATE").toString())){
		Date tdate=DateUtil.fomatDate(pd.get("ANSWERDATE").toString());
		pd.put("ANSWERDATE", tdate);
		}
		try {
			questService.problemBack(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据添加成功");
		return map;		
	}
	
	@RequestMapping(value="/batchEdit",method=RequestMethod.POST)
	@ResponseBody
	public void batchEdit(){
		  PageData pd = this.getPageData();	  
		  JSONArray json=null;	 
		  for (Object key : pd.keySet()) {
			  json=JSONArray.fromObject(key);		  
		}
		  List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
		try {
			for (PageData pageData : list) {
				if(Tools.notEmpty(pageData.getString("DATE_"))){
					Date date_ =DateUtil.fomatDate(pageData.getString("DATE_"));
					pageData.put("DATE_", date_);
				}
				
				if(Tools.notEmpty(pageData.getString("INDATE"))){
					Date indate =DateUtil.fomatDate(pageData.getString("INDATE"));					
					pageData.put("INDATE", indate);
				}
				
				
				if((boolean) pageData.get("SHOWMARK")){
					pageData.put("SHOWMARK", "YES");
				}
			}
			questService.batchEdit(list);
		} catch (Exception e) {
	
			e.printStackTrace();
		}
	}
		
	@RequestMapping(value="/opTempLoad",method=RequestMethod.GET)
	@ResponseBody
	public Object opTempLoad(){
		try {
			return questService.opTempList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value="/addOp" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addOp(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			questService.addOp(pd);
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
	
	
	@RequestMapping(value="/backOp",method=RequestMethod.GET)
	@ResponseBody
	public Object backOp(){
		PageData pd =this.getPageData();
		try {
			return questService.backOp(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping("/printPage")
	public ModelAndView printPage() throws Exception{
		ModelAndView mv = this.getModelAndView();
		PageData pd = this.getPageData();
		mv.setViewName("printPage");
		mv.addObject("pd",pd);
		return mv;
	}

}
