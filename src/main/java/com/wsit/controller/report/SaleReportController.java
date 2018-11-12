package com.wsit.controller.report;

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
import com.wsit.service.SaleReportService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.ObjectExcelView;
import com.wsit.utils.PageData;

@RequestMapping("/report")
@Controller
public class SaleReportController extends BaseController {

	@Resource
	private SaleReportService saleReportService;

	@RequestMapping(value = "/load", method = RequestMethod.GET)
	@ResponseBody
	public Object load() {
		PageData pd = getPageData();
		Date date = DateUtil.fomatDate(pd.get("SALEDATE").toString());
		pd.put("SALEDATE", date);
		try {
			return saleReportService.sale(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping("/excel")
	public ModelAndView exportExcel() throws Exception {
		ModelAndView mv = this.getModelAndView();
		PageData pd = this.getPageData();
		Date date = DateUtil.fomatDate(pd.get("SALEDATE").toString());
		pd.put("SALEDATE", date);
		Map<String, Object> dataMap = new HashMap<String, Object>();
		List<String> titles = new ArrayList<String>();
		titles.add("销售时间");
		titles.add("实体名称");
		titles.add("当日销售");
		titles.add("去年可比日销售");
		titles.add("可比增长");
		titles.add("当月累计");
		titles.add("同比月度累计");
		dataMap.put("titles", titles);
		dataMap.put("SALEDATE", date);
		List<PageData> userList = saleReportService.sale(pd);
		List<PageData> varList = new ArrayList<PageData>();
		for (int i = 0; i < userList.size(); i++) {
			PageData vpd = new PageData();
			vpd.put("var1", (userList.get(i).get("SALEDATE") + "").substring(0, 10)); // 1
			vpd.put("var2", userList.get(i).get("STORENAME") + ""); // 2
			vpd.put("var3", userList.get(i).get("CURRAMT") + ""); // 3
			vpd.put("var4", userList.get(i).get("COMAMT") + ""); // 4
			vpd.put("var5", userList.get(i).get("COMINCREASE") + ""); // 5
			vpd.put("var6", userList.get(i).get("CURRSUM") + ""); // 6
			vpd.put("var7", userList.get(i).get("HISSUM") + ""); // 7 //8
			varList.add(vpd);
			dataMap.put("varList", varList);
			ObjectExcelView erv = new ObjectExcelView(); // 执行excel操作
			mv = new ModelAndView(erv, dataMap);
		}
		return mv;
	}

	@RequestMapping(value = "/duty", method = RequestMethod.POST)
	@ResponseBody
	public Object dutyInput() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		Date date = DateUtil.fomatDate(pd.get("DATE_").toString());
		pd.put("DATE_", date);
		try {
			saleReportService.dutyInput(pd);
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
}
