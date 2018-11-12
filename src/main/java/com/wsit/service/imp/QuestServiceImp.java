package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.wsit.dao.DaoSupport;
import com.wsit.service.QuestService;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;

import net.sf.json.JSONArray;
@Service
public class QuestServiceImp implements QuestService{

	@Resource
	DaoSupport dao;

	@Override
	public List<PageData> questList(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("QuestMapper.questList", pd);
	}

	@Override
	public void batchEdit(List<PageData> list) throws Exception {
	
		
		  dao.batchUpdate("QuestMapper.batchEdit", list);
	}

	@Override
	public List<PageData> opTempList() throws Exception {
		
		return (List<PageData>) dao.findForList("QuestMapper.opTempList", null);
	}

	@Override
	public void problemBack(PageData pd) throws Exception {
		dao.update("QuestMapper.modState", pd.getString("PROBLEMBACKSEQ"));
		dao.save("QuestMapper.problemBack", pd);
		
	}

	@Override
	public List<PageData> overProblem(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("QuestMapper.overProblem", pd);
	}

	@Override
	public void addQuest(PageData pd) throws Exception {
		dao.save("QuestMapper.addQuest", pd);
		
	}

	@Override
	public List<PageData> backDetail(PageData pd) throws Exception {
	
		return (List<PageData>) dao.findForList("QuestMapper.backDetail", pd);
	}

	@Override
	public void addOpTemp(PageData pd) throws Exception {
		dao.save("QuestMapper.addOpTemp", pd);
	}

	@Override
	public void addOp(PageData pd) throws Exception {
		   JSONArray json=JSONArray.fromObject(pd.get("jsonData"));
		   List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
		   String PROBLEMBACKSEQ = pd.getString("PROBLEMBACKSEQ");
		  /* dao.delete("QuestMapper.delOp", PROBLEMBACKSEQ);*/
		   for (PageData pageData : list) {
			   pageData.put("PROBLEMBACKSEQ", PROBLEMBACKSEQ);
			   dao.save("QuestMapper.addOp", pageData);
		}
		
		
	}

	@Override
	public List<PageData> backOp(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("QuestMapper.backOp", pd);
	}
}
