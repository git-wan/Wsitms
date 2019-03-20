package com.wsit.controller;

import java.text.SimpleDateFormat;
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

import com.wsit.controller.BaseController;
import com.wsit.service.AssessService;
import com.wsit.service.SaleReportService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.ObjectExcelView;
import com.wsit.utils.PageData;

@RequestMapping("/assess")
@Controller
public class AssessController extends BaseController {

	@Resource
	private AssessService assessService;

	@RequestMapping(value = "/assInfoList", method = RequestMethod.GET)
	@ResponseBody
	public Object assInfoList() {
		PageData pd = getPageData();		
		try {
			return assessService.assInfoList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	@RequestMapping(value = "/assInfoNameList", method = RequestMethod.GET)
	@ResponseBody
	public Object assInfoNameList() {
		PageData pd = getPageData();
		try {
			return assessService.assInfoNameList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	@RequestMapping(value = "/assessList", method = RequestMethod.GET)
	@ResponseBody
	public Object assList() {
		PageData pd = getPageData();		
		try {
			return assessService.assessList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	
	@RequestMapping(value = "/asspatList", method = RequestMethod.GET)
	@ResponseBody
	public Object asspatList() {
		PageData pd = getPageData();		
		try {
			return assessService.asspatList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "/queryDate", method = RequestMethod.GET)
	@ResponseBody
	public Object queryDate() {
		PageData pd = getPageData();		
		try {
			return assessService.queryDate(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
		
	@RequestMapping(value = "/assInfo", method = RequestMethod.GET)
	@ResponseBody
	public Object assInfo() {
		PageData pd = getPageData();		
		try {
			return assessService.assInfo(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value = "/addAssInfo",method = RequestMethod.POST)
	@ResponseBody
	public Object addAssInfo(){
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		pd.put("ID",get32UUID());
		try {
			assessService.addAssInfo(pd);
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
	
	@RequestMapping(value = "/modAssInfo",method = RequestMethod.POST)
	@ResponseBody
	public Object modAssInfo(){
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			assessService.modAssInfo(pd);
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
	
	
	@RequestMapping(value = "/modAssSco",method = RequestMethod.POST)
	@ResponseBody
	public Object modAssSco(){
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			assessService.modAssSco(pd);
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
	
	@RequestMapping(value="/delAssInfo" ,method=RequestMethod.POST)
	@ResponseBody
	public Object delAssInfo(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			assessService.delAssInfo(pd);
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
	
	@RequestMapping(value = "/getMonthAss",method = RequestMethod.GET)
	@ResponseBody
	public Object  getMonthAss(){
		PageData  pd = this.getPageData();
		try {
		return	assessService.getMonthAss(pd);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}		
	}


	@RequestMapping(value = "/getAsj",method = RequestMethod.GET)
	@ResponseBody
	public Object  getAsj(){
		PageData  pd = this.getPageData();
		try {
			return	assessService.getAsj(pd);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@RequestMapping(value = "/addAss",method = RequestMethod.POST)
	@ResponseBody
	public Object addAss(){
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			assessService.addAss(pd);
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

	@RequestMapping(value = "/addAssAsj",method = RequestMethod.POST)
	@ResponseBody
	public Object addAssAsj(){
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			assessService.addAssAsj(pd);
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

	@RequestMapping(value = "/modAssAsj",method = RequestMethod.POST)
	@ResponseBody
	public Object modAssAsj(){
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			assessService.modAssAsj(pd);
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

	@RequestMapping(value="/delAssAsj" ,method=RequestMethod.GET)
	@ResponseBody
	public Object delAssAsj(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			assessService.delAssAsj(pd);
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

	@RequestMapping(value = "/addAssPlan",method = RequestMethod.POST)
	@ResponseBody
	public Object addAssPlan(){
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			assessService.addAssPlan(pd);
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

    @RequestMapping(value = "/modAssPlan",method = RequestMethod.POST)
    @ResponseBody
    public Object modAssPlan(){
        PageData pd = this.getPageData();
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            assessService.modAssPlan(pd);
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

	@RequestMapping(value="/delAssPlan" ,method=RequestMethod.GET)
	@ResponseBody
	public Object delAssPlan(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			assessService.delAssPlan(pd);
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
	@RequestMapping(value="/isAsj" ,method=RequestMethod.GET)
	@ResponseBody
	public Object isAsj(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		int flag =0;
		try {
			 flag = assessService.isAsj(pd);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "0");
			return map;
		}
		if(flag==1){
			map.put("success", true);
			map.put("msg", "1");
			return map;
		}
		if(flag==2){
			map.put("success", true);
			map.put("msg", "2");
			return map;
		}
		map.put("success", true);
		map.put("msg", "3");
		return map;
	}

    @RequestMapping(value = "/assResList", method = RequestMethod.GET)
	@ResponseBody
	public Object assResList() {
		PageData pd = getPageData();
		/*Date date = DateUtil.fomatDate1(pd.get("ASS_DATE").toString());
		pd.put("ASS_DATE", date);*/
		try {
			return assessService.AssResList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "/AssResultList", method = RequestMethod.GET)
	@ResponseBody
	public Object AssResultList() {
		PageData pd = getPageData();
	/*	Date date = DateUtil.fomatDate1(pd.get("ASS_DATE").toString());
		pd.put("ASS_DATE", date);*/
		try {
			return assessService.AssResultList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	@RequestMapping(value = "/asjList", method = RequestMethod.GET)
	@ResponseBody
	public Object asjList() {
		PageData pd = getPageData();
		try {
			return assessService.asjList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value = "/assplanList", method = RequestMethod.GET)
	@ResponseBody
	public Object assTimeList() {
		PageData pd = getPageData();
		try {
			return assessService.assplanList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping("/assExcel")
	public ModelAndView exportExcel() throws Exception {
		ModelAndView mv = this.getModelAndView();
		PageData pd = this.getPageData();
		Date date = DateUtil.fomatDate1(pd.get("ASS_DATE")+"");
		//pd.put("ASS_DATE", date);
		Map<String, Object> dataMap = new HashMap<String, Object>();
		List<String> titles = new ArrayList<String>();
		titles.add("评定时间");
		titles.add("姓名");
		titles.add("工作质量（30分）");
		titles.add("工作效率（30分）");
		titles.add("考勤纪律（10分）");
		titles.add("行为规范（10分）");
		titles.add("责任感（10分）");
		titles.add("创新性（10分）");
		titles.add("考核等级");
		titles.add("总分");
		titles.add("A,B,C,D类员工情况说明");
		dataMap.put("titles", titles);
		dataMap.put("ASS_DATE", date);
		dataMap.put("name", "月评");
		List<PageData> userList = assessService.AssResultList(pd);		
		List<PageData> varList = new ArrayList<PageData>();
		SimpleDateFormat formatStr = new SimpleDateFormat("yyyy-MM");		
		for (int i = 0; i < userList.size(); i++) {
			String dateStr = formatStr.format(userList.get(i).get("ASS_DATE"));
			PageData vpd = new PageData();
			vpd.put("var1", dateStr); // 1
			vpd.put("var2", userList.get(i).get("ASS_OBJECT") + ""); // 2
			vpd.put("var3", userList.get(i).get("QUALITY") + ""); // 3
			vpd.put("var4", userList.get(i).get("EFFICIENCY") + ""); // 4
			vpd.put("var5", userList.get(i).get("CHECKWORK") + "");
			vpd.put("var6", userList.get(i).get("ACTION") + "");
			vpd.put("var7", userList.get(i).get("RESPONSIBILITY") + "");
			vpd.put("var8", userList.get(i).get("CREATIVE") + "");
			vpd.put("var9", userList.get(i).get("ASS_LEVEL") + "");
			vpd.put("var10", userList.get(i).get("F_SCO") + "");
			vpd.put("var11",  "");
			varList.add(vpd);
			dataMap.put("varList", varList);
			ObjectExcelView erv = new ObjectExcelView(); // 执行excel操作
			mv = new ModelAndView(erv, dataMap);
		}
		return mv;
	}
	
}
