const org = require(appRoot + "/src/org")
const agenda = require(appRoot + "/src/agenda")


module.exports = (io) => {
  const auth = require(appRoot + "/src/auth");
  const getOrgFolders = async (req, res) => {

    try {
      const conn = auth.refreshConnection(req.session)
      const result = await org.getFolders(conn)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const getOrgDatasets = async (req, res) => {

    try {
      const conn = auth.refreshConnection(req.session)
      const result = await org.getDatasets(conn, req.params.folder_id)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const getOrgDataflows = async (req, res) => {

    try {
      const conn = auth.refreshConnection(req.session)
      const result = await org.getDataflows(conn, req.params.folder_id)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const getCurrentDataflowVersion = async (req, res) => {

    try {
      const conn = auth.refreshConnection(req.session)
      const result = await org.getSingleDataflow(conn, req.params.dataflow_id)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const getOrgTemplates = async (req, res) => {

    try {
      const conn = auth.refreshConnection(req.session)
      const result = await org.getTemplates(conn)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const getSingleOrgTemplate = async (req, res) => {

    try {
      const conn = auth.refreshConnection(req.session)
      const result = await org.getSingleTemplate(conn, req.params.template_id)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const deleteSingleOrgTemplate = async (req, res) => {

    try {
      const conn = auth.refreshConnection(req.session)
      const result = await org.deleteSingleTemplate(conn, req.params.template_id)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const createTemplateFromApp = async (req, res) => {

    try {

      const params = {
        session: req.session,
        folder_id: req.body.folder_id,
        dataflow_id: req.body.dataflow_id
      }

      const conn = auth.refreshConnection(req.session)
      const result = await org.createTemplate(conn, params)

      res.status(200).json(result)

    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const updateTemplateFromApp = async (req, res) => {

    try {

      const params = {
        session: req.session,
        folder_id: req.body.folder_id,
        dataflow_id: req.body.dataflow_id
      }

      const conn = auth.refreshConnection(req.session)
      const result = await org.updateTemplate(conn, params)

      res.status(200).json(result)

    } catch (e) {
      console.error(e)
      res.status(500).json(e.message)
    }

  }

  const refreshDatasets = async (req, res) => {

    const refresh = await agenda.now("refresh_datasets", req.session)

    res.status(200).json({
      refresh: {
        job_id: refresh.attrs._id,
        run_at: refresh.attrs.nextRunAt
      }
    })

  }

  const runDataflow = async (req, res) => {

    const params = {
      session: req.session,
      dataflow_id: req.params.dataflow_id
    }

    const refresh = await agenda.now("run_dataflow", params)

    res.status(200).json({
      refresh: {
        job_id: refresh.attrs._id,
        run_at: refresh.attrs.nextRunAt
      }
    })

  }

  return {
    getOrgFolders: getOrgFolders,
    getOrgDatasets: getOrgDatasets,
    getOrgDataflows: getOrgDataflows,
    getCurrentDataflowVersion: getCurrentDataflowVersion,
    getOrgTemplates: getOrgTemplates,
    getSingleOrgTemplate: getSingleOrgTemplate,
    deleteSingleOrgTemplate: deleteSingleOrgTemplate,
    createTemplateFromApp: createTemplateFromApp,
    updateTemplateFromApp: updateTemplateFromApp,
    refreshDatasets: refreshDatasets,
    runDataflow: runDataflow
  }
}