package com.wsit.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.wsit.service.ProbService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@RequestMapping("/question")
@Controller
public class ProblemController extends BaseController {

	@Resource
	ProbService probService;

	// 待回复问题列表
	@RequestMapping(value = "/load", method = RequestMethod.GET)
	@ResponseBody
	public Object load() {
		PageData pd = this.getPageData();
		try {
			return probService.questList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 根据查询条件，得到已回复数据
	@RequestMapping(value = "/overProblem", method = RequestMethod.GET)
	@ResponseBody
	public Object overProblem() {
		PageData pd = this.getPageData();
		String STRATDATE = pd.get("STRATDATE").toString();
		String ENDDATE = pd.get("ENDDATE").toString();
		if (Tools.notEmpty(STRATDATE)) {
			Date sdate = DateUtil.fomatDate(STRATDATE);
			pd.put("STRATDATE", sdate);
		}
		if (Tools.notEmpty(ENDDATE)) {
			Date tdate = DateUtil.fomatDate(ENDDATE);
			pd.put("ENDDATE", tdate);
		}
		try {
			return probService.overProblem(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 回复详情
	@RequestMapping(value = "/backDetail", method = RequestMethod.GET)
	@ResponseBody
	public Object backDetail() {
		PageData pd = this.getPageData();
		try {
			return probService.backDetail(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 问题记录
	@RequestMapping(value = "/addQuest", method = RequestMethod.POST)
	@ResponseBody
	public Object addQuest() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		String DATE_ = pd.get("DATE_").toString();
		if (Tools.notEmpty(DATE_)) {
			Date tdate = DateUtil.fomatDate(DATE_);
			pd.put("DATE_", tdate);
		}
		pd.put("INDATE", new Date());
		try {
			probService.addQuest(pd);
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

	// 添加操作模板
	@RequestMapping(value = "/addOpTemp", method = RequestMethod.POST)
	@ResponseBody
	public Object addOpTemp() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			probService.addOpTemp(pd);
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

	// 回复问题
	@RequestMapping(value = "/problemBack", method = RequestMethod.POST)
	@ResponseBody
	public Object problemBack() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		if (Tools.notEmpty(pd.get("ANSWERDATE").toString())) {
			Date tdate = DateUtil.fomatDate(pd.get("ANSWERDATE").toString());
			pd.put("ANSWERDATE", tdate);
		}
		try {
			probService.problemBack(pd);
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

	// 批量修改问题
	@RequestMapping(value = "/batchEdit", method = RequestMethod.POST)
	@ResponseBody
	public void batchEdit() {
		PageData pd = this.getPageData();
		JSONArray json = null;
		for (Object key : pd.keySet()) {
			json = JSONArray.fromObject(key);
		}
		List<PageData> list = (List<PageData>) JSONArray.toCollection(json, PageData.class);
		try {
			for (PageData pageData : list) {
				if (Tools.notEmpty(pageData.getString("DATE_"))) {
					Date date_ = DateUtil.fomatDate(pageData.getString("DATE_"));
					pageData.put("DATE_", date_);
				}
				if (Tools.notEmpty(pageData.getString("INDATE"))) {
					Date indate = DateUtil.fomatDate(pageData.getString("INDATE"));
					pageData.put("INDATE", indate);
				}
				if ((boolean) pageData.get("SHOWMARK")) {
					pageData.put("SHOWMARK", "YES");
				}
			}
			probService.batchEdit(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 加载操作模板
	@RequestMapping(value = "/opTempLoad", method = RequestMethod.GET)
	@ResponseBody
	public Object opTempLoad() {
		try {
			return probService.opTempList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 添加操作记录
	@RequestMapping(value = "/addOp", method = RequestMethod.POST)
	@ResponseBody
	public Object addOp() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			probService.addOp(pd);
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

	// 加载回复详情操作记录
	@RequestMapping(value = "/backOp", method = RequestMethod.GET)
	@ResponseBody
	public Object backOp() {
		PageData pd = this.getPageData();
		try {
			List<PageData> list = probService.backOp(pd);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 技术分享列表
	@RequestMapping(value = "/artList", method = RequestMethod.GET)
	@ResponseBody
	public Object artList() {
		PageData pd = this.getPageData();
		try {
			return probService.artList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 添加文章
	@RequestMapping(value = "/addArt", method = RequestMethod.POST)
	@ResponseBody
	public Object addArt() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			probService.addArt(pd);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", true);
			map.put("msg", "数据添加失败");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据添加成功");
		return map;
	}

	// 修改文章
	@RequestMapping(value = "/modArt", method = RequestMethod.POST)
	@ResponseBody
	public Object modArt() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			probService.modArt(pd);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", true);
			map.put("msg", "数据修改成功");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据修改成功");
		return map;
	}

	// 点击量
	@RequestMapping(value = "/hit", method = RequestMethod.GET)
	@ResponseBody
	public void hit() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			probService.hit(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	// 上传文件会自动绑定到MultipartFile中
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public Object upload(@RequestParam("file") MultipartFile file) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		// String result;
		// 如果文件不为空，写入上传路径
		if (!file.isEmpty()) {
			// 上传文件路径,tomcat路径
			// String path = request.getServletContext().getRealPath("/img/");
			// 自定义路径
			String path = "E:\\MyEclipse 2017 CI\\Workspaces\\Wsitms\\src\\main\\webapp\\resources\\media";
			// 上传文件名
			String filename = file.getOriginalFilename();
			File filepath = new File(path, filename);
			// 判断路径是否存在，如果不存在就创建一个
			if (!filepath.getParentFile().exists()) {
				filepath.getParentFile().mkdirs();
			}
			// 将上传文件保存到一个目标文件当中
			file.transferTo(new File(path + File.separator + filename));
			// result="success";
			map.put("success", true);
			map.put("msg", "上传成功");
			return map;
		} else {
			map.put("success", false);
			map.put("msg", "上传失败");
			return map;
		}
	}

	// 资讯部成员列表
	@RequestMapping(value = "/infoUsers", method = RequestMethod.GET)
	@ResponseBody
	public Object infoUsers() {
		PageData pd = this.getPageData();
		try {
			return probService.artList(pd);
		} catch (Exception e) { 
		}
		return null;
	}
  
	// 已处理问题
	@RequestMapping(value = "/delPorb", method = RequestMethod.POST)
	@ResponseBody
	public Object delProb() { 
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			probService.delPorb(pd);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("msg", "数据处理失败");
			return map;
		}
		map.put("msg", "数据处理成功");
		return map;
	}

}
