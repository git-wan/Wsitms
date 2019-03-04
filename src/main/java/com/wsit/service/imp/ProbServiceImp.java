package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.wsit.dao.DaoSupport;
import com.wsit.service.ProbService;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;

import net.sf.json.JSONArray;
@Service
public class ProbServiceImp implements ProbService{

	@Resource
	DaoSupport dao;

	@Override
	public List<PageData> questList(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("ProbMapper.questList", pd);
	}

	@Override
	public void batchEdit(List<PageData> list) throws Exception {
	
		
		  dao.batchUpdate("ProbMapper.batchEdit", list);
	}

	@Override
	public List<PageData> opTempList() throws Exception {
		
		return (List<PageData>) dao.findForList("ProbMapper.opTempList", null);
	}

	@Override
	public void problemBack(PageData pd) throws Exception {
		dao.update("ProbMapper.modState", pd.getString("PROBLEMBACKSEQ"));
		dao.save("ProbMapper.problemBack", pd);
		
	}

	@Override
	public List<PageData> overProblem(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("ProbMapper.overProblem", pd);
	}

	@Override
	public void addQuest(PageData pd) throws Exception {
		dao.save("ProbMapper.addQuest", pd);
		
	}

	@Override
	public List<PageData> backDetail(PageData pd) throws Exception {
	
		return (List<PageData>) dao.findForList("ProbMapper.backDetail", pd);
	}

	@Override
	public void addOpTemp(PageData pd) throws Exception {
		dao.save("ProbMapper.addOpTemp", pd);
	}

	@Override
	public void addOp(PageData pd) throws Exception {
		   JSONArray json=JSONArray.fromObject(pd.get("jsonData"));
		   List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
		   String PROBLEMBACKSEQ = pd.getString("PROBLEMBACKSEQ");
		   for (PageData pageData : list) {
			   pageData.put("PROBLEMBACKSEQ", PROBLEMBACKSEQ);
			   dao.save("ProbMapper.addOp", pageData);
		}
		
		
	}

	@Override
	public List<PageData> backOp(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("ProbMapper.backOp", pd);
	}

	@Override
	public List<PageData> artList(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("ProbMapper.artList", pd);
	}

	@Override
	public void addArt(PageData pd) throws Exception {
		
		dao.save("ProbMapper.addArt", pd);
	}

	@Override
	public void modArt(PageData pd) throws Exception {
		
		dao.update("ProbMapper.modArt", pd);
	}

	@Override
	public void hit(PageData pd) throws Exception {
		
		dao.update("ProbMapper.hit", pd);
	}

	@Override
	public void delPorb(PageData pd) throws Exception {
		
		dao.update("ProbMapper.delPorb", pd);
	}
}
